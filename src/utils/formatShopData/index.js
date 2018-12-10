export default function formatShopData(shopData) {
  let formattedShopData = []
  shopData.forEach(shop => {
    const newShop = {
      ...shop,
      id: shop._id
    }
    formattedShopData.push(newShop)
  })

  return formattedShopData
}
