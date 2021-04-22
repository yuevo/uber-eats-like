import React, { Fragment,  useReducer, useEffect ,useState } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useHistory, Link } from "react-router-dom";

// components
import { LocalMallIcon } from '../components/Icons';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/FoodWrapper' was resolved to... Remove this comment to see the full error message
import { FoodWrapper } from '../components/FoodWrapper';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/NewOrderConfirmDialog' was r... Remove this comment to see the full error message
import { NewOrderConfirmDialog } from '../components/NewOrderConfirmDialog';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  HeaderWrapper,
  MainLogoImage
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/StyledHeader.jsx' was resolv... Remove this comment to see the full error message
} from '../components/StyledHeader.jsx';

// reducers
import {
  initialState as foodsInitialState,
  foodsActionTyps,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';
import { postLineFoods, replaceLineFoods } from '../apis/line_foods';

// images
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../images/logo.png' or its cor... Remove this comment to see the full error message
import MainLogo from '../images/logo.png';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/FoodOrderDialog' was resolve... Remove this comment to see the full error message
import { FoodOrderDialog } from '../components/FoodOrderDialog';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../images/food-image.jpg' or i... Remove this comment to see the full error message
import FoodImage from '../images/food-image.jpg';

// constants
import { HTTP_STATUS_CODE } from '../constants';
import { COLORS } from '../style_constants';
import { REQUEST_STATE } from '../constants';

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Foods = ({
  match
}) => {
  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingRestaurantName: '',
    newRestaurantName: '',
  };
  const [state, setState] = useState(initialState);
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: foodsActionTyps.FETCHING });
    fetchFoods(match.params.restaurantsId)
      .then((data) => {
        dispatch({
          type: foodsActionTyps.FETCH_SUCCESS,
          payload: {
            foods: data.foods
          }
        });
      })
  }, []);

  const submitOrder = () => {
    postLineFoods({
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }).then(() => history.push('/orders'))
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState({
            ...state,
            isOpenOrderDialog: false,
            isOpenNewOrderDialog: true,
            existingRestaurantName: e.response.data.existing_restaurant,
            newRestaurantName: e.response.data.new_restaurant,
          })
        } else {
          throw e;
        }
      })
  };

  const replaceOrder = () => {
    replaceLineFoods({
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }).then(() => history.push('/orders'))
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Fragment>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <HeaderWrapper>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link to="/restaurants">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <BagIconWrapper>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Link to="/orders">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <FoodsList>
        {
          foodsState.fetchState === REQUEST_STATE.LOADING ?
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Fragment>
              {
                // @ts-expect-error ts-migrate(2569) FIXME: Type 'IterableIterator<number>' is not an array ty... Remove this comment to see the full error message
                [...Array(12).keys()].map(i =>
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <ItemWrapper key={i}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Skeleton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </Fragment>
          :
            foodsState.foodsList.map(food =>
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <ItemWrapper key={food.id}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <FoodWrapper
                  food={food}
                  onClickFoodWrapper={
                    (food) => setState({
                      ...state,
                      selectedFood: food,
                      isOpenOrderDialog: true,
                    })
                  }
                  imageUrl={FoodImage}
                />
              </ItemWrapper>
            )
        }
      </FoodsList>
      {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        state.isOpenOrderDialog &&
        <FoodOrderDialog
          isOpen={state.isOpenOrderDialog}
          food={state.selectedFood}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount + 1,
          })}
          onClickCountDown={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount - 1,
          })}
          onClickOrder={() => submitOrder()}
          onClose={() => setState({
            ...state,
            isOpenOrderDialog: false,
            selectedFood: null,
            selectedFoodCount: 1,
          })}
        />
      }
      {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        state.isOpenNewOrderDialog &&
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() => setState({ ...state, isOpenNewOrderDialog: false })}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          onClickSubmit={() => replaceOrder()}
        />
      }
    </Fragment>
  )
}
