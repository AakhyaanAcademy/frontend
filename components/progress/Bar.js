export const Bar = ({ animationDuration, progress }) => (
    <div
      className="bg-indigo-600 fixed left-0 top-0 z-50 h-1 w-full"
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    ></div>
  )