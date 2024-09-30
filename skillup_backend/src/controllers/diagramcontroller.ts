import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";
import { nodeCache } from "../index.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { Order } from "../models/orderModel.js";
import { calculatePercentage } from "../utils/features.js";


export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let statsDiagram = {};

        if (nodeCache.has("stats_diagram")) {
            statsDiagram = JSON.parse(nodeCache.get("stats_diagram") as string);
        } else {
            let today = new Date();

            //  Six month ago revenue generated and Transation 
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

            // set a start end date for this month ;

            const thisMonth = {
                start: new Date(today.getFullYear(), today.getMonth(), 1),
                end: today
            };

            const lastMonth = {
                start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
                end: new Date(today.getFullYear(), today.getMonth(), 0)
            };

            const thisMonthProduct = Product.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                }
            });

            const LastMonthProduct = Product.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                }
            });


            const thisMonthUser = User.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                }
            });

            const LastMonthUser = User.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                }
            });



            const thisMonthOrder = Order.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                }
            });

            const LastMonthOrder = Order.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                }
            });

            //  Last Six Months Order 
            const LastSixMonthsOrder = Order.find({
                createdAt: {
                    $gte: sixMonthsAgo,
                    $lte: today
                }
            });



            const [
                thisMonthProducts,
                LastMonthProducts,
                thisMonthUsers,
                LastMonthUsers,
                thisMonthOrderProducts,
                LastMonthOrderProducts,
                productsCount,
                usersCount,
                allOrders,
                LastSixMonthsOrders,

            ]: any = await Promise.all([
                thisMonthProduct,
                LastMonthProduct,
                thisMonthUser,
                LastMonthUser,
                thisMonthOrder,
                LastMonthOrder,
                Product.countDocuments(),
                User.countDocuments(),
                Order.find({}).select("total"),
                LastSixMonthsOrder,
            ]);

            // male and female show the database 
            const femaleCount = await User.countDocuments({ "gender": "female" });
            const maleCount = await User.countDocuments({ "gender": "male" });

            // const productsCount = await Product.countDocuments();
            // const usersCount = await User.countDocuments();
            // const allOrders = await Order.find({}).select("total");

            const categories = await Product.distinct("category");



            // Latest Transactions 
            const latestTransactions = await Order.find({}).sort({ createdAt: -1 }).limit(5);
            console.log("latest transactions", latestTransactions);

            // CountDocuments  Category 
            const categoriesCountPromise = categories?.map((category) =>
                Product.countDocuments({ category })
            );
            const categoriesCount = await Promise.all(categoriesCountPromise);
            console.log("categoriesCount", categoriesCount);

            const categoryCount = [] as any[];

            categories?.forEach((category, index) => {
                categoryCount.push({
                    category,
                    count: Math.round(categoriesCount[index] / productsCount) * 100
                });
            })
            console.log("category", categoryCount);


            const userChangePercent = calculatePercentage(thisMonthUsers?.length, LastMonthUsers?.length);
            const productChangePercent = calculatePercentage(thisMonthProducts?.length, LastMonthProducts?.length);
            const orderChangePercent = calculatePercentage(thisMonthOrderProducts?.length, LastMonthOrderProducts?.length);

            // revenue generated 

            const thisMonthRevenue = thisMonthOrderProducts?.reduce((total: any, order: any) => {
                return total + (order.total || 0);
            }, 0);



            const LastMonthRevenue = LastMonthOrderProducts?.reduce((total: any, order: any) => {
                return total + (order.total || 0);
            }, 0);

            // All Order Revenue 
            const allOrderRevenue = LastMonthOrderProducts?.reduce((total: any, order: any) => {
                return total + (order.total || 0);
            }, 0);


            const count = {
                revenue: allOrderRevenue,
                product: productsCount,
                user: usersCount,
                order: allOrders?.length
            };

            const orderMonthCounts = new Array(6).fill(0);
            const orderMonthRevenue = new Array(6).fill(0);


            LastSixMonthsOrders?.forEach((order: any) => {
                const creationDate = order.createdAt;
                const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

                if (monthDiff < 6) {
                    orderMonthCounts[6 - monthDiff - 1] += 1;
                    orderMonthRevenue[6 - monthDiff - 1] += order.total;
                };
            });

            const charts = {
                orderMonthCounts: orderMonthCounts,
                orderMonthRevenue: orderMonthRevenue
            };

            const changePercent = {
                user: userChangePercent,
                product: productChangePercent,
                order: orderChangePercent,
            };

            const gender = {
                female: femaleCount,
                male: maleCount
            };


            const modificationFication = latestTransactions?.map((elm: any) => ({
                _id: elm?._id,
                discount: elm.discount,
                total: elm?.total,
                quantity: elm?.orderItems.length,
                status: elm?.status,
            }));


            statsDiagram = {
                // revenue: calculatePercentage(200, 455),
                changePercent,
                count,
                charts,
                categoryCount,
                gender,
                latestTransactions: modificationFication,
            }
            nodeCache.set("stats_diagram", JSON.stringify(statsDiagram))
        };

        return res.json({
            status: true,
            statsDiagram
        }).status(200);


    } catch (error: any) {
        return next(new ClassErrorHandler(error?.message, 501));
    }
};


export const getPieCharts = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let pieCharts;

        if (nodeCache.has("pieCharts")) {
            pieCharts = JSON.parse(nodeCache.get("pieCharts") as string);
        } else {

            const [
                processing,
                shipped,
                delivered,
                inStock,
                outOfStock,
                totoalAdmin,
                totalUser,
                userAgeGroup
            ]:
                any = await Promise.all([
                    Order.countDocuments({ status: "Processing" }),
                    Order.countDocuments({ status: "Shipped" }),
                    Order.countDocuments({ status: "Delivered" }),
                    Product.find({ stock: { $gte: 0 } }).countDocuments(),
                    Product.find({ stock: { $lte: 0 } }).countDocuments(),
                    User.countDocuments({ role: "admin" }),
                    User.countDocuments({ role: "user" }),
                    User.find({}).select("dob")
                ]);

            let category = await Product.distinct("category");
            const countCategorie = category?.map((category) => Product.countDocuments({ category }))
            const countCategories = await Promise.all(countCategorie);
            console.log("category", countCategories);

            let categories = [] as any[];

            category.forEach((cate, i) => {
                categories.push({
                    cate,
                    count: countCategories[i]
                })
            })


            // revenue distribution chart 
            const allOrder = await Order.find({}).select(["total", "discount", "subtotal", "tax", "shippingcharges"]);

            // Totoal income Orders
            const totalGrosIncome = allOrder.reduce((acc, curr) => {
                return acc + curr.total || 0;
            }, 0);

            // disCount 
            const disCount = allOrder.reduce((acc, curr) => {
                return acc + curr.discount || 0;
            }, 0);

            const productionCost = allOrder.reduce((acc, curr) => {
                return acc + curr.shippingcharges || 0;
            }, 0);

            const burnt = allOrder.reduce((acc, curr) => {
                return acc + curr.tax || 0;
            }, 0);

            const marketingCost = Math.round(totalGrosIncome * (30 / 100));

            const netMargin = totalGrosIncome - disCount - productionCost - burnt - marketingCost;


            let stock = {
                inStock,
                outOfStock
            };

            console.log("age", userAgeGroup?.filter((user: any) => user?.dob < 200).length)

            let age = {
                teen: userAgeGroup?.filter((user: any) => user.age < 20).length,
                adult: userAgeGroup?.filter((user: any) => user.age > 20 && user?.age < 40).length,
                old: userAgeGroup?.filter((user: any) => user.age > 40 && user?.age < 150).length,
            }

            let revenueDistribution = {
                netMargin,
                totalGrosIncome,
                disCount,
                productionCost,
                burnt,
                marketingCost
            };

            let totoalCustomer = {
                totalUser,
                totoalAdmin
            }
            pieCharts = {
                processing,
                shipped,
                delivered,
                stock,
                categories,
                revenueDistribution,
                totoalCustomer,
                age
            }

            nodeCache.set("pieCharts", JSON.stringify(pieCharts));
        };

        return res.json({
            status: true,
            pieCharts
        }).status(200);

    } catch (error: any) {
        return next(new ClassErrorHandler(error?.message, 501));
    }
};






export const getBarCharts = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let barCharts;

        if (nodeCache.has("bar-charts")) {
            barCharts = JSON.parse(nodeCache.get("bar-charts") as string);
        } else {

            const today =

                nodeCache.set("bar-charts", JSON.stringify(barCharts) as any);
        };



        return res.json({
            status: true,
            bar: barCharts
        }).status(200);

    } catch (error: any) {
        return next(new ClassErrorHandler(error?.message, 501));
    }
};

export const getLineCharts = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
        return next(new ClassErrorHandler(error?.message, 501));
    };
}