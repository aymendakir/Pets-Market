import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, Loader, Mail } from "lucide-react";
import {
    GetCountries,
    GetState,
    GetCity,
    //async functions
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import useAuthContextCart from "../../../Context/CartContexte";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import useAuthContext from "../../../Context/ApiContext";
import { Link, useNavigate } from "react-router-dom";
import PaymentDon from "../PaymentDon/PaymentDon";
import { useQuery } from "@tanstack/react-query";
// Define your Zod schema
const checkoutSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    fullName: z.string().min(5, { message: "Invalid fullName" }),
    country: z.string().min(1, { message: "Invalid country" }),
    city: z.string().min(1, { message: "Invalid city" }),
    address: z.string().min(5, { message: "Invalid address" }),
});

function CheckOut() {
    const { FinalProduct, finalProduct } = useAuthContextCart([]);
    const { ProfileLogin, IsLogin } = useAuthContext([]);
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [ShippingPrix, setShippingPrix] = useState(10);
    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [SuccessOrder, setSuccessOrder] = useState(false);
    const [OrderId, setOrderId] = useState(0);

    const navigate = useNavigate();
    const { data: ProfileData } = useQuery({
        queryKey: ["ProfileLogin"],
        queryFn: async () => {
            return await ProfileLogin();
        },
        refetchInterval: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        retryOnMount: 3,
    });
    const url = "https://commerce-backend-tau.vercel.app";
    useEffect(() => {
        if (!FinalProduct) {
            navigate("/");
        }
        IsLogin().then((response) => {
            if (!response) {
                navigate("/");
            }
        });
        GetCountries().then((result) => {
            setCountriesList(result);
        });
        finalProduct();
    }, []);
    const {
        control,
        handleSubmit,
        register,
        setValue,
        getValues,

        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
    });

    // Example usage
    const totalPrice = FinalProduct?.reduce(
        (total, product) => total + +product.price,
        0
    );
    const stripe = useStripe();
    const elements = useElements();
    const handleStripePayment = async (user) => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post(`${url}/payment`, {
                    amount: ((+totalPrice + +ShippingPrix) * 100).toFixed(0), // Convert to cents for Stripe
                    id,
                    orderDetails: FinalProduct,
                    user: user,
                });

                if (response.data.success) {
                    saveOrder(response.data.payment); // Save order in backend
                }
            } catch (error) {
                console.error("Error with Stripe payment", error);
            }
        } else {
            console.error("Stripe error:", error.message);
        }
    };
    const saveOrder = async (orderData) => {
        try {
            const response = await axios
                .post(`${url}/order`, {
                    total_amount: +totalPrice + +ShippingPrix,

                    user_id: ProfileData?.id,
                    order_status: "Pending",
                    price_shipping: ShippingPrix,
                    adresse: getValues("address"),
                    city: getValues("city"),
                    country: getValues("country"),
                    payment_id: orderData,
                    shipping_method: "fedex",
                    email: getValues("email"),
                    fullname: getValues("fullName"),

                    orderItems: JSON.stringify(FinalProduct),
                })
                .then((res) => {
                    if (res.data.success) {
                        setOrderId(orderData);
                        setSuccessOrder(true);
                        sessionStorage.removeItem("FinalProduct");
                        localStorage.removeItem("CartProduct");
                    }
                });
        } catch (error) {
            console.error("Failed to save order:", error);
        }
    };

    const onSubmit = async (user) => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post(`${url}/payment`, {
                    amount: ((+totalPrice + +ShippingPrix) * 100).toFixed(0), // Convert to cents for Stripe
                    id,
                    orderDetails: FinalProduct,
                    user: user,
                });

                if (response.data.success) {
                    saveOrder(response.data.payment); // Save order in backend
                }
            } catch (error) {
                console.error("Error with Stripe payment", error);
            }
        } else {
            console.error("Stripe error:", error.message);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <Link to={"/"} className="text-2xl font-bold text-gray-800">
                    ClothStyle
                </Link>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                </p>
                                <span className="font-semibold text-gray-900">Shop</span>
                            </li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                {SuccessOrder ? (
                                    <p className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </p>
                                ) : (
                                    <p
                                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white ${
                                            !SuccessOrder &&
                                            "ring ring-gray-600 ring-offset-2 !bg-gray-600"
                                        }  `}
                                    >
                                        2
                                    </p>
                                )}

                                <span className="font-semibold text-gray-900">Shipping</span>
                            </li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <p
                                    className={`flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white ${
                                        SuccessOrder &&
                                        "ring ring-gray-600 ring-offset-2 !bg-gray-600"
                                    }  `}
                                >
                                    3
                                </p>
                                <span className="font-semibold text-gray-500">Facture</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {!SuccessOrder ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32"
                >
                    <div className="px-4 pt-8">
                        <p className="text-xl font-medium">Order Summary</p>
                        <p className="text-gray-400">
                            Check your items. And select a suitable shipping method.
                        </p>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            {FinalProduct?.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                                >
                                    <img
                                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                        src={product?.images[0]?.name}
                                        alt=""
                                    />
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-semibold">{product.name}</span>
                                        <span className="cart-price text-[14px]  mt-[5px]  flex font-mono">
                      Color:
                      <div
                          className={`mr-[5px] p-2 w-2 h-1 rounded-full  border border-gray-400  
                         
                        `}
                          style={{
                              backgroundColor: `${product?.color}`,
                          }}
                      ></div>
                    </span>
                                        <span className="cart-price text-[14px]  mt-[5px] flex items-center font-mono">
                      Size:
                      <p
                          className={`mr-[5px]  w-5 h-5 rounded-md border border-gray-400 bg-gray-50 text-center 
                          `}
                      >
                        {product?.size}
                      </p>
                    </span>
                                        <p className="text-lg font-bold">${product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                        <div className="mt-5 grid gap-6">
                            <div className="relative">
                                <input
                                    className="peer hidden"
                                    id="radio_1"
                                    type="radio"
                                    name="radio"
                                    onClick={() => {
                                        setShippingPrix(10);
                                        setValue("shipping", 10);
                                    }}
                                    defaultChecked
                                />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label
                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                    htmlFor="radio_1"
                                >
                                    <img
                                        className="w-14 object-contain"
                                        src="https://turbologo.com/articles/wp-content/uploads/2019/12/Fedex-logo.png"
                                        alt=""
                                    />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">Fedex Delivery</span>
                                        <p className="text-slate-500 text-sm leading-6">
                                            Delivery: 2-4 Days
                                        </p>
                                    </div>
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    className="peer hidden"
                                    id="radio_2"
                                    type="radio"
                                    name="radio"
                                    onClick={() => {
                                        setShippingPrix(20);
                                        setValue("shipping", 20);
                                    }}
                                />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label
                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                    htmlFor="radio_2"
                                >
                                    <img
                                        className="w-14 object-contain"
                                        src="https://turbologo.com/articles/wp-content/uploads/2019/12/Fedex-logo.png"
                                        alt=""
                                    />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">Fedex Delivery</span>
                                        <p className="text-slate-500 text-sm leading-6">
                                            Delivery: 2-4 Days
                                        </p>
                                    </div>
                                </label>
                            </div>
                            {errors.shipping && (
                                <span className="ml-3 text-sm text-red-400">
                  {errors.shipping.message}
                </span>
                            )}
                        </div>
                    </div>
                    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                        <p className="text-xl font-medium">Payment Details</p>
                        <p className="text-gray-400">
                            Complete your order by providing your payment details.
                        </p>
                        <div className="">
                            <label className="mt-4 mb-2 block text-sm font-medium">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="your.email@gmail.com"
                                    {...register("email")}
                                    style={
                                        errors.email && {
                                            borderColor: "red",
                                        }
                                    }
                                />

                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <Mail />
                                </div>
                            </div>
                            {errors.email && (
                                <span className="ml-3 text-sm text-red-400">
                  {errors.email.message}
                </span>
                            )}
                            <label className="mt-4 mb-2 block text-sm font-medium">
                                Card Holder
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="card-holder"
                                    name="card-holder"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Your full name here"
                                    {...register("fullName")}
                                    style={
                                        errors.fullName && {
                                            borderColor: "red",
                                        }
                                    }
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <IdCard />
                                </div>
                            </div>
                            {errors.fullName && (
                                <span className="ml-3 text-sm text-red-400">
                  {errors.fullName.message}
                </span>
                            )}
                            <label className="mt-4 mb-2 block text-sm font-medium">
                                Card Details
                            </label>
                            <div className="mt-6 border border-gray-300 rounded-lg p-4">
                                <CardNumberElement
                                    options={{ showIcon: true }}
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg "
                                />
                                <CardExpiryElement className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />
                                <CardCvcElement className="w-full p-3 border border-gray-300 rounded-lg" />
                            </div>
                            <label className="mt-4 mb-2 block text-sm font-medium">
                                Billing Address
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative  sm:w-7/12">
                                    <input
                                        type="text"
                                        id="billing-address"
                                        name="billing-address"
                                        className="!w-[300px] rounded-md border border-gray-200 px-4 py-3 pl-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Street Address"
                                        {...register("address")}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
                                </div>
                                <select
                                    className="flex-shrink-0 !w-[150px] rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => {
                                        const country = countriesList[e.target.value];
                                        setCountryid(country.id);
                                        GetState(country.id).then((result) => {
                                            setStateList(result);
                                        });
                                        setValue("country", country.name);
                                    }}
                                >
                                    {countriesList.map((item, index) => (
                                        <option key={index} value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.country && (
                                    <span className="ml-3 text-sm text-red-400">
                    {errors.country.message}
                  </span>
                                )}
                                <select
                                    className="flex-shrink-0 !w-[120px] rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => {
                                        const state = stateList[e.target.value];
                                        setValue("city", state.name);

                                        setStateid(state.id);
                                        GetCity(countryid, state.id).then((result) => {});
                                    }}
                                >
                                    {stateList.map((item, index) => (
                                        <option key={index} value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.city && (
                                    <span className="ml-3 text-sm text-red-400">
                    {errors.city.message}
                  </span>
                                )}
                            </div>

                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                    <p className="font-semibold text-gray-900">${totalPrice}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                                    <p className="font-semibold text-gray-900">${ShippingPrix}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ${+totalPrice + +ShippingPrix}
                                </p>
                            </div>
                        </div>
                        <button
                            disabled={isSubmitting}
                            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white flex items-center justify-center gap-2"
                        >
                            <Loader
                                className={`${
                                    !isSubmitting && "hidden"
                                } animate-spin  text-white`}
                            />
                            Place Order
                        </button>
                    </div>
                </form>
            ) : (
                <PaymentDon id={OrderId} />
            )}
        </>
    );
}

export default CheckOut;
