const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  );
};

export default Loader;


export const Skeleton = ({ width = "unset" }: { width: string }) => {
  return (
    <div>
      <div className="skeleton-loader" style={{ width }}>ajinkya</div>
      <div className="skeleton-shape">a</div>
      <div className="skeleton-shape">b</div>
      <div className="skeleton-shape">c</div>
    </div>
  )
};