import LoadingBox from "./LoadingBox";

/**
 * 
 * @returns {React.Component}
 * 
 * @version 1.0.0
 * @since 2.0.0
 *
 */
const LoadingPanel = () => (
  <div className="absolute top-1/3 w-2/3 h-6 grid grid-cols-8 gap-1 justify-center justify-items-center bg-transparent group">
    <LoadingBox />
    <LoadingBox />
    <LoadingBox />
    <LoadingBox />
    <LoadingBox />
    <LoadingBox />
    <LoadingBox />
    <LoadingBox />
  </div>
);

export default LoadingPanel;
