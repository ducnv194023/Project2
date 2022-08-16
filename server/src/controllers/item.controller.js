const catchAsync = require('../utils/catchAsync')
const Message = require('../utils/Message')
const { sendSuccess } = require('../libs/response')
const itemService = require('../services/item.service')

const createItem = catchAsync(async (req, res) => {
  const newItem = await itemService.createItem(req.body)
  sendSuccess({ res, data: newItem, message: Message.itemMsg.created })
})

const getItems = catchAsync(async (req, res) => {
  const items = await itemService.getItems(req.body)
  console.log(items)
  sendSuccess({ res, data: items, message: Message.itemMsg.success })
})

const getItemById = catchAsync(async (req, res) => {
  const { itemId } = req.params
  const itemModel = await itemService.getItemById(itemId)
  sendSuccess({ res, data: itemModel, message: Message.itemMsg.success })
})

const updateItemById = catchAsync(async (req, res) => {
  await itemService.updateItemById(req.body)
  sendSuccess({ res, message: Message.itemMsg.success })
})

const deleteItemById = catchAsync(async (req, res) => {
  const { itemId } = req.params
  await itemService.deleteItemById(itemId)
  sendSuccess({ res, message: Message.itemMsg.success })
})

const signTicket = catchAsync(async (req, res) => {
  const ticket = await itemService.signTicket(req.body)
  sendSuccess({ res, data: ticket, message: Message.itemMsg.success })
})

const getOwnerTicket = catchAsync(async (req, res) => {
  const ownerTickets = await itemService.getOwnerTicket(req.body)
  sendSuccess({ res, data: ownerTickets, message: Message.itemMsg.success })
})

const signSwimmingWear = catchAsync(async (req, res) => {
  const swimmingWear = await itemService.signSwimmingWear(req.body)
  sendSuccess({ res, data: swimmingWear, message: Message.itemMsg.success })
})

const getOwnerWear = catchAsync(async (req, res) => {
  const getOwnerWear = await itemService.getOwnerWear(req.body)
  sendSuccess({ res, data: getOwnerWear, message: Message.itemMsg.success })
})
module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
  signTicket,
  getOwnerTicket,
  signSwimmingWear,
  getOwnerWear
}
