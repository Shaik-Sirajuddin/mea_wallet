import {
  ChevronDownIcon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store";
import { setQuotes, setSwapFee } from "@/src/features/token/tokenSlice";
import { setFreeBalances } from "@/src/features/balance/balanceSlice";
import useUser from "@/hooks/useUser";
import useAsset from "@/hooks/useAsset";
import PrimaryButton from "../components/PrimaryButton";
import SvgIcon from "../components/SvgIcon";
import InfoAlert, { InfoAlertProps } from "../components/InfoAlert";
import OtpModal from "../components/OTPModal";
import Decimal from "decimal.js";
import {
  parseNumberForView,
  tokenImageMap,
  trimTrailingZeros,
} from "@/utils/ui";
import { TokenBalances, TokenQuotes } from "@/src/types/balance";

type TokenType = keyof TokenBalances;

const getFontSize = (text: string) => {
  if (text.length <= 6) return 32;
  if (text.length <= 10) return 28;
  if (text.length <= 14) return 24;
  return 20;
};

const SwapTokens = () => {
  const dispatch = useDispatch<AppDispatch>();

  // State from Redux
  const quotes = useSelector((state: RootState) => state.token.quotes);
  const freeBalance = useSelector((state: RootState) => state.balance.free);
  const swapFee = useSelector((state: RootState) => state.token.swapFee);

  // Local state
  const [fromToken, setFromToken] = useState<TokenType>("sol");
  const [toToken, setToToken] = useState<TokenType>("mea");
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [isCalculatingReceive, setIsCalculatingReceive] = useState(false);
  const [isCalculatingPay, setIsCalculatingPay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [adminCommission, setAdminCommission] = useState("0");

  // Modal states
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [infoAlertVisible, setInfoAlertVisible] = useState(false);
  const [infoAlertState, setInfoAlertState] = useState<Partial<InfoAlertProps>>(
    {}
  );

  // Available tokens
  const availableTokens: Array<{ value: TokenType; label: string }> = [
    { value: "sol", label: "SOL" },
    { value: "mea", label: "MEA" },
    { value: "fox9", label: "FOX9" },
    { value: "recon", label: "RECON" },
  ];

  // Fetch quotes and balance
  const fetchQuotes = async () => {
    const res = await useUser.getQuotes();
    if (typeof res === "string") {
      console.log(res, "fetch quotes");
      return;
    }
    dispatch(setQuotes(res));
  };

  const fetchBalance = async () => {
    const res = await useUser.getBalance();
    if (typeof res === "string") {
      console.log(res, "fetch balance");
      return;
    }
    dispatch(setFreeBalances(res.free));
  };

  const fetchSwapFee = async () => {
    const res = await useUser.getSwapFee();
    if (typeof res === "string") {
      console.log(res, "fetch swap fee");
      return;
    }
    dispatch(setSwapFee(res));
  };

  // Initial data fetch
  useEffect(() => {
    const initialFetch = async () => {
      await Promise.all([fetchQuotes(), fetchBalance(), fetchSwapFee()]);
      setIsInitialLoading(false);
    };
    initialFetch();
  }, []);

  // Periodic refresh every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      fetchQuotes();
      fetchBalance();
      fetchSwapFee();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("receive vamount", receiveAmount);
  }, [receiveAmount]);
  // Calculate receive amount when pay amount changes
  useEffect(() => {
    if (
      payAmount &&
      !isCalculatingPay &&
      quotes[fromToken] &&
      quotes[toToken] &&
      new Decimal(quotes[fromToken]).gt(0) &&
      new Decimal(quotes[toToken]).gt(0)
    ) {
      setIsCalculatingReceive(true);
      try {
        const payValue = new Decimal(payAmount).mul(quotes[fromToken]);
        const receiveValue = payValue.div(quotes[toToken]);
        const feeAmount = receiveValue.mul(swapFee || "0").div("100");
        const finalReceive = receiveValue.sub(feeAmount);
        //todo : fixed at 9 decimal zeroes at max
        setAdminCommission(trimTrailingZeros(feeAmount.toFixed(9)));
        setReceiveAmount(trimTrailingZeros(finalReceive.toFixed(9)));
      } catch (error) {
        console.log(error);
        setReceiveAmount("0");
      }
      setIsCalculatingReceive(false);
    }
  }, [payAmount, fromToken, toToken, quotes, swapFee]);

  // Calculate pay amount when receive amount changes
  // useEffect(() => {
  //   if (
  //     receiveAmount &&
  //     !isCalculatingReceive &&
  //     quotes[fromToken] &&
  //     quotes[toToken] &&
  //     new Decimal(quotes[fromToken]).gt(0) &&
  //     new Decimal(quotes[toToken]).gt(0)
  //   ) {
  //     setIsCalculatingPay(true);
  //     try {
  //       const receiveValue = new Decimal(receiveAmount).mul(quotes[toToken]);
  //       const feeMultiplier = new Decimal("1").sub(
  //         new Decimal(swapFee || "0").div("100")
  //       );
  //       const payValue = receiveValue.div(feeMultiplier);
  //       const finalPay = payValue.div(quotes[fromToken]);
  //       setPayAmount(trimTrailingZeros(finalPay.toFixed(6)));
  //     } catch (error) {
  //       setPayAmount("0");
  //     }
  //     setIsCalculatingPay(false);
  //   }
  // }, [receiveAmount, fromToken, toToken, quotes, swapFee]);

  // Validate balance
  const validateBalance = useCallback(() => {
    if (!payAmount || new Decimal(payAmount ?? 0).lte(0)) {
      return { isValid: false, message: "Enter amount to pay" };
    }

    if (fromToken === toToken) {
      return { isValid: false, message: "Cannot swap same token" };
    }

    if (
      !quotes[fromToken] ||
      !quotes[toToken] ||
      new Decimal(quotes[fromToken]).lte(0) ||
      new Decimal(quotes[toToken]).lte(0)
    ) {
      return { isValid: false, message: "Quotes not available" };
    }

    const userBalance = new Decimal(freeBalance[fromToken] || "0");
    const requiredAmount = new Decimal(payAmount);

    if (requiredAmount.gt(userBalance)) {
      return { isValid: false, message: "Insufficient balance" };
    }

    return { isValid: true, message: "" };
  }, [payAmount, fromToken, toToken, freeBalance, quotes]);

  const balanceCheck = useMemo(() => {
    let val = validateBalance();
    console.log(val);
    return val;
  }, [validateBalance]);

  // Handle OTP submission
  const handleOTPSubmit = async (otp: string | null) => {
    setOtpModalVisible(false);

    if (!otp || otp.length < 6) {
      setInfoAlertState({
        text: "Please enter a valid 6-digit OTP",
        type: "error",
      });
      setInfoAlertVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const swapPayload = {
        buyCoin: toToken.toUpperCase(),
        sellCoin: fromToken.toUpperCase(),
        platformFeePercent: swapFee || "0",
        adminComission: adminCommission, // This would need to be calculated based on actual fees
        sellAmount: payAmount,
        expectedReceivableBeforeFee: new Decimal(adminCommission)
          .add(receiveAmount)
          .toFixed(9),
        expectedReceivable: receiveAmount,
        fromCurrencyPrice: quotes[fromToken],
        toCurrencyPrice: quotes[toToken],
        minDepositAmount: "0", // This would need to be fetched from settings
        otpCode: otp,
      };

      const result = await useAsset.swapTokens(swapPayload);

      if (typeof result === "string") {
        setInfoAlertState({
          text: result,
          type: "error",
        });
        setInfoAlertVisible(true);
      } else {
        setInfoAlertState({
          text: "Swap completed successfully!",
          type: "success",
        });
        setInfoAlertVisible(true);
        // Clear amounts after successful swap
        setPayAmount("");
        setReceiveAmount("");
      } 
    } catch (error) {
      console.log(error);
      setInfoAlertState({
        text: "An error occurred during swap",
        type: "error",
      });
      setInfoAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle swap button press
  const handleSwap = () => {
    if (!balanceCheck.isValid) {
      setInfoAlertState({
        ...infoAlertState,
        text: balanceCheck.message,
        type: "error",
      });
      setInfoAlertVisible(true);
      return;
    }
    setOtpModalVisible(true);
  };

  // Get token balance display
  const getTokenBalance = (token: TokenType) => {
    return `${freeBalance[token] || "0"} ${token.toUpperCase()}`;
  };

  // Get token price display
  const getTokenPrice = (token: TokenType) => {
    return `$${quotes[token] || "0"}`;
  };
  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto py-8 px-4">
        <View className="w-full h-full">
          <View className="items-center relative">
            <Pressable className="absolute left-0 top-0 z-10 p-2">
              <SvgIcon name="crossIcon" width="14" height="14" />
            </Pressable>
            <Text className="text-lg font-semibold text-white">
              Swap Tokens
            </Text>
          </View>
          <View className="relative mt-10 h-full pb-14">
            <View className="bg-black-1200 p-[18px] rounded-[15px]">
              {/* Row 1: Label */}
              <Text className="text-[15px] font-medium leading-[22px] text-gray-1200 mb-2">
                You Pay
              </Text>

              {/* Row 2: Amount input */}
              <View className="flex flex-row items-center h-20">
                <TextInput
                  keyboardType="numeric"
                  placeholder="0"
                  value={payAmount}
                  onChangeText={setPayAmount}
                  style={{
                    fontSize: getFontSize(receiveAmount),
                  }}
                  className="flex-1 text-[28px] font-medium text-pink-1200 placeholder:text-gray-1200 bg-transparent border-0"
                />

                <View className="bg-gray-1300 flex rounded-[18px] h-10 pr-2 justify-start  flex-row items-center pl-2">
                  <Image
                    source={tokenImageMap[fromToken]}
                    className="w-7 h-7 rounded-full bg-black"
                  />
                  <Select
                    className="!border-transparent py-0 text-xs -mt-0.5 !gap-0 !text-gray-1200"
                    selectedValue={fromToken}
                    onValueChange={(value) => setFromToken(value as TokenType)}
                  >
                    <SelectTrigger className="!border-transparent w-[90px] text-center !gap-0  leading-none !p-0">
                      <SelectInput
                        className="ml-0 !text-base leading-none text-center !font-medium !p-0 placeholder:!text-gray-1200 !text-gray-1200"
                        placeholder="SOL"
                      />
                      <SelectIcon className="mr-0" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {availableTokens.map((token) => (
                          <Select.Item
                            key={token.value}
                            label={token.label}
                            value={token.value}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </View>
              </View>

              {/* Row 3: Symbol selection and balance */}
              <View className="flex-row items-center justify-between mt-4">
                <Pressable className="ml-2">
                  <SvgIcon name="smallSwapIcon" />
                </Pressable>
                <Text className="text-[15px] font-medium leading-[22px] text-gray-1200 ml-3">
                  {getTokenBalance(fromToken)}
                </Text>
              </View>
            </View>

            <Pressable
              className="bg-pink-1100 w-8 h-8 mx-auto z-50 active:opacity-50 -my-2.5 relative rounded-full items-center justify-center"
              onPress={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
                setPayAmount("");
                setReceiveAmount("");
              }}
            >
              <SvgIcon name="qlementineIcon" width="20" height="20" />
            </Pressable>

            <View className="bg-black-1200 p-[18px] rounded-[15px]">
              {/* Row 1: You Receive */}
              <Text className="text-[15px] font-medium leading-[22px] text-gray-1200 mb-2">
                You Receive
              </Text>

              {/* Row 2: Amount Input + Symbol Selection */}
              <View className="flex flex-row items-center !h-20">
                <TextInput
                  keyboardType="default"
                  placeholder="0"
                  editable={false}
                  value={parseNumberForView(receiveAmount)}
                  style={{
                    fontSize: getFontSize(receiveAmount),
                  }}
                  className="flex-1 text-[28px] font-medium text-pink-1200 placeholder:text-gray-1200 bg-transparent border-0"
                />

                <View className="bg-gray-1300 flex rounded-[18px] h-10 pr-2 justify-start flex-row items-center pl-2 ml-2">
                  <Image
                    source={tokenImageMap[toToken]}
                    className="w-7 h-7 rounded-full bg-black"
                  />
                  <Select
                    className="!border-transparent py-0 text-xs -mt-0.5 !gap-0 !text-gray-1200"
                    selectedValue={toToken}
                    onValueChange={(value) => setToToken(value as TokenType)}
                  >
                    <SelectTrigger className="!border-transparent w-[90px] text-center !gap-0 leading-none !p-0">
                      <SelectInput
                        className="ml-0 !text-base leading-none text-center !font-medium !p-0 placeholder:!text-gray-1200 !text-gray-1200"
                        placeholder="MEA"
                      />
                      <SelectIcon className="mr-0" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {availableTokens.map((token) => (
                          <Select.Item
                            key={token.value}
                            label={token.label}
                            value={token.value}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </View>
              </View>

              {/* Row 3: Swap icon + Balance */}
              <View className="flex-row items-center justify-between">
                <Pressable>
                  <SvgIcon name="smallSwapIcon" />
                </Pressable>
                <Text className="text-[15px] font-medium leading-[22px] text-gray-1200">
                  {getTokenBalance(toToken)}
                </Text>
              </View>
            </View>

            <Text className="text-sm leading-[22px] font-normal mt-3 text-gray-1200">
              Quote includes a {swapFee || "0"}% platform fee
            </Text>

            <PrimaryButton
              text={
                balanceCheck.isValid
                  ? isLoading
                    ? "Processing..."
                    : "Swap"
                  : balanceCheck.message
              }
              onPress={handleSwap}
              // disabled={!balanceCheck.isValid || isLoading || isInitialLoading}
              // className={`text-base mt-auto font-semibold mb-[9px] w-full text-white leading-[22px] rounded-[15px] items-center justify-center h-[45px] ${
              //   balanceCheck.isValid && !isLoading && !isInitialLoading
              //     ? "bg-pink-1100 border border-pink-1100"
              //     : "bg-gray-600 border border-gray-600"
              // }`}
            />
          </View>
        </View>
      </View>

      {/* OTP Modal */}
      <OtpModal visible={otpModalVisible} onClose={handleOTPSubmit} />

      {/* Info Alert */}
      <InfoAlert
        {...infoAlertState}
        visible={infoAlertVisible}
        setVisible={setInfoAlertVisible}
        onDismiss={() => {
          //show success
        }}
      />
    </View>
  );
};

export default SwapTokens;
