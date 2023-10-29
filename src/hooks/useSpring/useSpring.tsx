import { useSpring, animated } from "react-spring";
const NumberStast = (n: number) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 0,
    config: { mass: 1, tension: 1030, friction: 114 },
  });
  return <animated.div>{number.to((n) => n.toFixed(2))}</animated.div>;
};
export default NumberStast;
