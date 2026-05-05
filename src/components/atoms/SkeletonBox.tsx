interface SkeletonBoxProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const SkeletonBox = ({
  width = '100%',
  height = '20px',
  rounded = 'rounded-md',
  className = '',
}: SkeletonBoxProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${rounded} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

export default SkeletonBox;
