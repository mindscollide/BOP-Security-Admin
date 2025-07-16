import { useEffect, useRef, useState } from "react";

export const useTableScrollBottom = (onBottomReach, threshold = 0) => {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = document.querySelector(".ant-table-body");

    if (scrollContainer) {
      containerRef.current = scrollContainer;

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const isBottom = scrollTop + clientHeight >= scrollHeight - threshold;

        if (isBottom && !hasReachedBottom) {
          setHasReachedBottom(true);
          onBottomReach?.();

          // Reset after action
          //   setTimeout(() => setHasReachedBottom(false), 1000);
        }
      };

      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [hasReachedBottom, onBottomReach, threshold]);

  return {
    hasReachedBottom,
    containerRef,
    setHasReachedBottom,
  };
};
