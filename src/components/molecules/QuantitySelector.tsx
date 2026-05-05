interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onDecrement}
        className="w-[45px] h-[45px] rounded-[17px] border border-[#E2E2E2] flex items-center justify-center text-[#B3B3B3] hover:border-[#B3B3B3] transition-colors cursor-pointer"
        aria-label="Decrease quantity"
      >
        <svg width="17" height="3" viewBox="0 0 17 3" fill="none" aria-hidden="true">
          <path d="M1 1.5h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <span
        className="min-w-[40px] text-center text-lg font-semibold text-[#181725] border border-[#E2E2E2] rounded-[17px] py-2"
        aria-live="polite"
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="w-[45px] h-[45px] rounded-[17px] border border-[#53B175] flex items-center justify-center text-[#53B175] hover:bg-[#53B175] hover:text-white transition-colors cursor-pointer"
        aria-label="Increase quantity"
      >
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
          <path d="M8.5 1v15M1 8.5h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;
