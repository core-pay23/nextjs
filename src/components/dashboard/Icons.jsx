import { Music, HardDrive, Activity, DollarSign } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faClockRotateLeft, faFileInvoiceDollar, faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
export function MusicIcon({ className }) {
  return <Music className={className} />;
}

export function HardDriveIcon({ className }) {
  return <HardDrive className={className} />;
}

export function ActivityIcon({ className }) {
  return <Activity className={className} />;
}

export function DollarSignIcon({ className }) {
  return <DollarSign className={className} />;
}

export function WalletIcon({ className }) {
  return <FontAwesomeIcon icon={faWallet} className={className} />;
}


export function HistoryIcon({ className }) {
  return <FontAwesomeIcon icon={faClockRotateLeft} className={className} />;
}

export const BillIcon = ({ className }) => {
  return <FontAwesomeIcon icon={faFileInvoiceDollar} className={className} />;
};

export const MoneyBillIcon = ({ className }) => {
  return <FontAwesomeIcon icon={faMoneyBill1} className={className} />;
}