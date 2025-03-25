import IconBtn from "../../../global/IconBtn";

/**
 * Component for displaying icons to react to a post.
 * @returns {React.Component}
 * 
 * @version 1.0.0
 * @since 2.0.0
 * @see IconBtn
 * 
 */
export const ReactionDisplay = () => (
  <span className="flex items-center w-fit h-full top-0 left-full absolute before:absolute before:content-[''] before:size-full before:bg-black before:-z-10 before:opacity-20 before:rounded-r-full before:w-full">
    <IconBtn icon="thumbs-up" size="2xl" />
    <IconBtn icon="heart" size="2xl" />
    <IconBtn icon="face-grin-hearts" size="2xl" />
    <IconBtn icon="face-grin-tears" size="2xl" />
    <IconBtn icon="face-surprise" size="2xl" />
    <IconBtn icon="face-sad-cry" size="2xl" />
    <IconBtn icon="face-angry" size="2xl" />
  </span>
);