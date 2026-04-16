import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

export default function P2PApp() {
  const [state, setState] = useState({});
  const [log, setLog] = useState([]);

  const addLog = (msg) => {
    setLog((prev) => [...prev, msg]);
  };

  const createPR = () => {
    if (!state.material || !state.qty) return addLog("Enter material & quantity");
    addLog(`PR Created: ${state.material} Qty: ${state.qty}`);
  };

  const selectVendor = (value) => {
    const [vendor, price] = value.split("|");
    setState({ ...state, vendor, price: parseFloat(price) });
    addLog(`Vendor Selected: ${vendor} @ ₹${price}`);
  };

  const createPO = () => {
    const amount = state.qty * state.price;
    const gst = amount * 0.18;
    const total = amount + gst;
    setState({ ...state, amount, gst, total });
    addLog(`PO Created: ₹${total.toFixed(2)}`);
  };

  const postGR = () => {
    addLog("Goods Receipt Posted → Inventory Updated");
  };

  const postInvoice = () => {
    addLog(`Invoice Posted: ₹${state.total?.toFixed(2)}`);
  };

  const makePayment = () => {
    const discount = state.amount * 0.02;
    const finalPay = state.total - discount;
    addLog(`Payment Done: ₹${finalPay.toFixed(2)} (2% Discount Applied)`);
  };

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">VendorBridge P2P Prototype (React)</h1>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">1. Purchase Requisition</h2>
          <Input placeholder="Material" onChange={(e) => setState({ ...state, material: e.target.value })} />
          <Input type="number" placeholder="Quantity" onChange={(e) => setState({ ...state, qty: parseInt(e.target.value) })} />
          <Button onClick={createPR}>Create PR</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">2. Vendor Selection</h2>
          <select onChange={(e) => selectVendor(e.target.value)} className="w-full p-2 border rounded">
            <option>Select Vendor</option>
            <option value="PackStar|23.8">PackStar - ₹23.80</option>
            <option value="BoxWorld|24.5">BoxWorld - ₹24.50</option>
            <option value="ClearPack|25.1">ClearPack - ₹25.10</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">3. Purchase Order</h2>
          <Button onClick={createPO}>Create PO</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">4. Goods Receipt</h2>
          <Button onClick={postGR}>Post GR</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">5. Invoice</h2>
          <Button onClick={postInvoice}>Post Invoice</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">6. Payment</h2>
          <Button onClick={makePayment}>Make Payment</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">System Log</h2>
          <div className="bg-black text-green-400 p-3 h-40 overflow-auto text-sm">
            {log.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
