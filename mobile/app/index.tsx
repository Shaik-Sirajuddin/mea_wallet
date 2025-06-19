import { View } from "react-native";
import GetStarted from "./(auth)/get-started";
import EditProfile from "./(Views)/settings/edit-profile";
import SelectAvatar from "./(Views)/settings/select-avatar";
import ReceiveItems from "./(Views)/receive-items";
import TransactionHistory from "./(Views)/transaction-history-view";
import MyStakingHistory from "./(Views)/my-staking-history";
import LockUpView from "./(Views)/lock-up-view";
import LockUpView2 from "./(Views)/lock-up-view-2";
import StakingView from "./(Views)/staking-view";
import SwapTokenCompleted from "./(Views)/deposit-completed";
import AmountSent from "./(Views)/amount-sent";
import "@/i18n/index";
import Signup from "./(auth)/signup";
import Signin from "./(auth)/signin";
import ForgetPassword from "./(auth)/forget-password";

export default function HomeScreen() {
  return (
    <View className="flex-1 h-full font-pretendard">
      <ForgetPassword />
      {/* <EditProfile /> */}
      {/* <SelectAvatar/> */}
      {/* <AccountName/> */}
      {/* <ReceiveItems/> */}
      {/* <MeaAddress/> */}
      {/* <SelectToken/> */}
      {/* <SelectToken2/> */}
      {/* <QRScanner/> */}
      {/* <AmountSent /> */}
      {/* <AmountSendCompleted/> */}
      {/* <SwapTokens/> */}
      {/* <SwapTokens2/> */}
      {/* <SwapTokenCompleted /> */}
      {/* <NativeView/> */}
      {/* <NativeView2/>   */}
      {/* <Deposit/> */}
      {/* <Deposit2/> */}
      {/* <WithDrawal/> */}
      {/* <WithDrawal2/> */}
      {/* <GoogleQRScanner/> */}
      {/* <GoogleQRScanner2/> */}
      {/* <WithdrawalCompleted/> */}
      {/* <HistoryView/> */}
      {/* <ChartView/> */}
      {/* <RecentActivity/> */}
      {/* <HistoryView2/> */}
      {/* <LockUpView/> */}
      {/* <FilterView/> */}
      {/* <LockUpView2/> */}
      {/* <StakingView /> */}
      {/* <MyStakingView/> */}
      {/* <FilterStakingView/> */}
      {/* <MyStakingHistory /> */}
      {/* <TransactionHistory /> */}
      {/* <FilterStakingEventView/> */}
    </View>
  );
}
