'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/hooks/useCart';
import { formatPrice, formatDimensions } from '@/lib/utils/formatters';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeItem, totalItems, totalPrice } = useCart();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-playfair font-medium text-charcoal-900">
                          Shopping Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-charcoal-400 hover:text-charcoal-500"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cart.items.length === 0 ? (
                            <div className="text-center py-12">
                              <ShoppingCart className="mx-auto h-12 w-12 text-charcoal-400" />
                              <h3 className="mt-2 text-sm font-medium text-charcoal-900">
                                Your cart is empty
                              </h3>
                              <p className="mt-1 text-sm text-charcoal-500">
                                Start adding some beautiful shelves to your cart.
                              </p>
                              <div className="mt-6">
                                <Button onClick={onClose} asChild>
                                  <Link href="/shop">Continue Shopping</Link>
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-charcoal-200">
                              {cart.items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-charcoal-200">
                                    <img
                                      src={item.image_url}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-charcoal-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">{formatPrice(item.total_price)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-charcoal-500">
                                        {item.wood_type} • {formatDimensions(item.length, item.depth)}
                                      </p>
                                      <p className="text-sm text-charcoal-500">
                                        {item.finish} • {item.bracket}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                          className="text-charcoal-400 hover:text-charcoal-600"
                                        >
                                          <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="text-charcoal-900 font-medium">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          className="text-charcoal-400 hover:text-charcoal-600"
                                        >
                                          <Plus className="h-4 w-4" />
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-walnut-600 hover:text-walnut-500"
                                          onClick={() => removeItem(item.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {cart.items.length > 0 && (
                      <div className="border-t border-charcoal-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-charcoal-900">
                          <p>Subtotal</p>
                          <p>{formatPrice(totalPrice)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-charcoal-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Button className="w-full" asChild>
                            <Link href="/checkout" onClick={onClose}>
                              Checkout
                            </Link>
                          </Button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-charcoal-500">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-walnut-600 hover:text-walnut-500"
                              onClick={onClose}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
