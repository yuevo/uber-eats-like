import axios from 'axios';
import { foodsIndex } from '../urls/index'
import { lineFoods, lineFoodsReplace } from '../urls/index'

export const fetchFoods =(restaurantId: any) => {
  return axios.get(foodsIndex(restaurantId))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}

export const replaceLineFoods = (params: any) => {
  return axios.put(lineFoodsReplace,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};
