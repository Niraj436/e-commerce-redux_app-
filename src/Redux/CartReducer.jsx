
const initialData = {
  cart_items: [],
  shipping_address:{}
};

const cartReducer = (state = initialData, action) => {
  switch (action.type) {
    case "add_to_cart":
      const existingItem = state.cart_items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedCartItems = state.cart_items.map((item) => {
          if (item.id === action.payload.id) {
            return {...state,
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return { ...state, item}
        });

        return {...state,
          cart_items: updatedCartItems,
        };
      } else {
        return {...state,
          cart_items: [...state.cart_items, action.payload],
        };
      }

    case "Remove_item":
      return {...state,
        cart_items: state.cart_items.filter(
          (item) => item.cart_id !== action.payload
        ),
      };

    case "update_item":
      let updated_item = action.payload;
      return {...state,
        cart_items: state.cart_items.map((item) =>
          item.cart_id === updated_item.cart_id ? updated_item : item
        ),
      };

    case "save_shipping_info":
      return {...state, shipping_address: action.payload }

    default:
      return state;
  }
};

export default cartReducer;
