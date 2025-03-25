const Image  = ({ src, alt, className }) => (
  <img className={`row-span-full size-12 rounded-full border-2 border-black ${className}`} src={src} alt={alt} />
);

export default Image;
