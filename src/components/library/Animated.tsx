import React from "react";
import { animated, easings, useSpring } from "react-spring";
import useMeasure from "react-use-measure";

interface Props {
  open: boolean;
  children: React.ReactNode;
}

const Collapsible = ({ open, children }: Props) => {
  const [ref, { height }] = useMeasure();
  const collapseProps = useSpring({
    height: open ? height : 0,
    config: {
      duration: 250,
      easing: easings.easeInOutQuart,
    },
  });

  return (
    <animated.div className="overflow-hidden" style={collapseProps}>
      <div ref={ref}>{children}</div>
    </animated.div>
  );
};

export { Collapsible };
