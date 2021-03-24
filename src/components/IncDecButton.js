export function IncDecButton({cart, product, dispatch}) {
  return (
    <div className="flex row align-items-center justify-content-space-between">
      <button
        className="btn-primary lg"
        onClick={() =>
          dispatch({
            type: "DECREMENT_QUANTITY",
            item: [...cart.filter((prev) => prev.id === product.id)][0],
          })
        }
      >
        -
      </button>
      <div className="">
        {cart.filter((prev) => prev.id === product.id)[0].quantity}
      </div>
      <button
        className="btn-primary lg"
        onClick={() => dispatch({type: "INCREMENT_QUANTITY", item: product})}
      >
        +
      </button>
    </div>
  );
}
