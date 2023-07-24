interface LoadingProps {
  className?: string;
}

const Loading = ({ className = "" }: LoadingProps) => {
  return (
    <div
      className={`h-24 w-24 rounded-full bg-black animate-pulse mx-auto ${className}`}
    />
  );
};

export default Loading;
