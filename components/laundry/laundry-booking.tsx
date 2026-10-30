'use client';

import React, { useState } from 'react';
import { 
  X, 
  Shirt, 
  Sparkles, 
  Calendar, 
  Clock, 
  Check, 
  Tag, 
  CreditCard, 
  ArrowLeft,
  Flame,
  Wind,
  MapPin
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function BookingModal({ isOpen, onClose, onComplete }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<'wash-fold' | 'wash-iron' | 'dry-clean' | 'duvets' | 'sneakers'>('sneakers');
  const [weightOrCount, setWeightOrCount] = useState(7);
  
  // Step 2 state (Customization & Add-ons)
  const [bioWash, setBioWash] = useState(false);
  const [fabricSoftener, setFabricSoftener] = useState(false);
  const [stainTreatment, setStainTreatment] = useState(true);
  const [expressDelivery, setExpressDelivery] = useState(false);

  // Step 3 state (Pickup & Delivery Slots)
  const [pickupDate, setPickupDate] = useState('Today (Oct 18)');
  const [pickupTime, setPickupTime] = useState('05:00 PM - 07:00 PM (Popular)');
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow (Oct 19)');
  const [deliveryTime, setDeliveryTime] = useState('12:00 PM - 02:00 PM');
  const [address, setAddress] = useState('742 Evergreen Terrace, Apt 4B, Springfield');
  const [instructions, setInstructions] = useState('e.g. Leave bag with doorman, gate code #4821, ring doorbell twice...');

  // Step 4 state (Summary & Payment)
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'cash'>('card');

  if (!isOpen) return null;

  // Rate calculations
  const getRate = () => {
    switch (serviceType) {
      case 'wash-fold': return 3.50;
      case 'wash-iron': return 4.80;
      case 'dry-clean': return 8.50;
      case 'duvets': return 18.00;
      case 'sneakers': return 15.00;
      default: return 15.00;
    }
  };

  const rate = getRate();
  const isItemBased = serviceType === 'dry-clean' || serviceType === 'duvets' || serviceType === 'sneakers';
  const subtotal = weightOrCount * rate;
  
  // Add-ons calculations
  const hypoCost = 2.00;
  const stainCost = stainTreatment ? 4.00 : 0;
  const deliveryFee = 2.50;
  const discount = promoApplied ? 5.00 : 0;
  const grandTotal = Math.max(0, subtotal + hypoCost + stainCost + deliveryFee - discount);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">
              {step}
            </span>
            <h2 className="text-sm font-bold text-slate-900">
              {step === 1 && 'Step 1: Select Service & Quantity'}
              {step === 2 && 'Step 2: Customization & Add-ons'}
              {step === 3 && 'Step 3: Pickup & Delivery Slot'}
              {step === 4 && 'Step 4: Summary & Payment'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div 
            className="bg-cyan-600 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          
          {/* STEP 1: Services & Quantity */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Choose the wash service that best fits your items today:
                </label>
                
                <div className="space-y-2.5">
                  <div 
                    onClick={() => { setServiceType('wash-fold'); setWeightOrCount(7); }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      serviceType === 'wash-fold' ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5">
                        <Shirt className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs font-bold text-slate-900">Wash & Fold</h4>
                          <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full">Popular</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">Everyday wear, t-shirts, jeans, towels & bedsheets</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900">$3.50</span>
                      <span className="text-[10px] text-slate-400 block">/ kg</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setServiceType('wash-iron'); setWeightOrCount(5); }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      serviceType === 'wash-iron' ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mt-0.5">
                        <Wind className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Wash & Iron</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">Washed, dried & pressed for a crisp, wrinkle-free look</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900">$4.80</span>
                      <span className="text-[10px] text-slate-400 block">/ kg</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setServiceType('dry-clean'); setWeightOrCount(3); }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      serviceType === 'dry-clean' ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mt-0.5">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Dry Cleaning</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">Delicate fabrics, suits, dresses, coats & silk</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900">$8.50</span>
                      <span className="text-[10px] text-slate-400 block">/ item</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setServiceType('duvets'); setWeightOrCount(1); }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      serviceType === 'duvets' ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Duvets & Heavy Items</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">Bulky blankets, comforters, curtains & heavy coats</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900">$18.00</span>
                      <span className="text-[10px] text-slate-400 block">/ item</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => { setServiceType('sneakers'); setWeightOrCount(7); }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      serviceType === 'sneakers' ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mt-0.5">
                        👟
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Sneaker & Shoe Care</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">Deep cleaning, deodorizing & sole restoration</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900">$15.00</span>
                      <span className="text-[10px] text-slate-400 block">/ pair</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Estimated {isItemBased ? 'Item Count' : 'Weight'} ({isItemBased ? 'items' : 'kgs'})
                  </span>
                  <span className="text-[10px] text-slate-400">Minimum {isItemBased ? '1 item' : '3 kgs'}</span>
                </div>
                <div className="flex items-center space-x-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  <button 
                    type="button"
                    onClick={() => setWeightOrCount(Math.max(isItemBased ? 1 : 3, weightOrCount - 1))}
                    className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-slate-900 w-8 text-center">
                    {weightOrCount} {isItemBased ? 'item' : 'kg'}
                  </span>
                  <button 
                    type="button"
                    onClick={() => setWeightOrCount(weightOrCount + 1)}
                    className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Customization & Add-ons */}
          {step === 2 && (
            <div className="space-y-3">
              <div 
                onClick={() => setBioWash(!bioWash)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  bioWash ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${bioWash ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-300 bg-white'}`}>
                    {bioWash && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Eco-Friendly Bio-Wash</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">100% plant-based organic laundry wash</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-xl">+$2.50</span>
              </div>

              <div 
                onClick={() => setFabricSoftener(!fabricSoftener)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  fabricSoftener ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${fabricSoftener ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-300 bg-white'}`}>
                    {fabricSoftener && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Premium Fabric Softener</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Extra softness & long-lasting lavender breeze</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-xl">+$1.50</span>
              </div>

              <div 
                onClick={() => setStainTreatment(!stainTreatment)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  stainTreatment ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${stainTreatment ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-300 bg-white'}`}>
                    {stainTreatment && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Targeted Stain Treatment</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Pre-wash spot treat for stubborn grease/wine stains</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-xl">+$4.00</span>
              </div>

              <div 
                onClick={() => setExpressDelivery(!expressDelivery)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  expressDelivery ? 'border-cyan-500 bg-cyan-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${expressDelivery ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-300 bg-white'}`}>
                    {expressDelivery && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Express 24h Delivery</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Get your clean laundry back within 24 hours</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-xl">+$8.00</span>
              </div>
            </div>
          )}

          {/* STEP 3: Pickup & Delivery Slot */}
          {step === 3 && (
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                  Pickup Day & Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option>Today (Oct 18)</option>
                    <option>Tomorrow (Oct 19)</option>
                    <option>Tuesday (Oct 20)</option>
                  </select>
                  <select 
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option>05:00 PM - 07:00 PM (Popular)</option>
                    <option>08:00 AM - 10:00 AM</option>
                    <option>12:00 PM - 02:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                  Delivery Day & Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option>Tomorrow (Oct 19)</option>
                    <option>Tuesday (Oct 20)</option>
                    <option>Wednesday (Oct 21)</option>
                  </select>
                  <select 
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option>12:00 PM - 02:00 PM</option>
                    <option>05:00 PM - 07:00 PM</option>
                    <option>08:00 AM - 10:00 AM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                  Pickup & Delivery Address
                </label>
                <input 
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Special Instructions for Driver
                </label>
                <textarea 
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Leave bag with doorman, gate code #4821, ring doorbell twice..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 h-20 resize-none text-slate-700 bg-white"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Payment */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2.5 text-xs">
                <span className="font-bold text-slate-900 block mb-1">Order Breakdown</span>
                <div className="flex justify-between text-slate-600">
                  <span>Sneaker & Shoe Care ({weightOrCount} pairs)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>+ Hypoallergenic Detergent</span>
                  <span className="font-semibold">${hypoCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>+ Targeted Stain Treatment</span>
                  <span className="font-semibold">${stainCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Logistics & Doorstep Delivery Fee</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Promo Discount (FRESH10)</span>
                    <span>-$5.00</span>
                  </div>
                )}
                <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-bold text-slate-900">
                  <span>Grand Total</span>
                  <span className="text-cyan-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    placeholder="ENTER PROMO CODE (E.G. FRESH10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 uppercase font-mono focus:outline-none focus:border-cyan-500 bg-white"
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => { if(promoCode) setPromoApplied(true); }}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                >
                  Apply
                </button>
              </div>

              <div 
                onClick={() => setUseLoyaltyPoints(!useLoyaltyPoints)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  useLoyaltyPoints ? 'border-cyan-500 bg-cyan-50/50' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-amber-500">🏆</span>
                  <span className="text-xs font-bold text-slate-800">
                    Redeem 340 Loyalty Points ($0.00)
                  </span>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${useLoyaltyPoints ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-300'}`}>
                  {useLoyaltyPoints && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                      paymentMethod === 'card' ? 'border-cyan-500 bg-cyan-50 text-cyan-900 font-bold' : 'border-slate-200 bg-white text-slate-600 font-medium'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1 text-cyan-600" />
                    <span className="text-[11px]">Credit Card</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                      paymentMethod === 'apple' ? 'border-cyan-500 bg-cyan-50 text-cyan-900 font-bold' : 'border-slate-200 bg-white text-slate-600 font-medium'
                    }`}
                  >
                    <span className="text-base mb-0.5">🍎</span>
                    <span className="text-[11px]">Apple Pay</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                      paymentMethod === 'cash' ? 'border-cyan-500 bg-cyan-50 text-cyan-900 font-bold' : 'border-slate-200 bg-white text-slate-600 font-medium'
                    }`}
                  >
                    <span className="text-base mb-0.5">💵</span>
                    <span className="text-[11px]">Cash</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button 
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button 
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition ml-auto"
            >
              Continue &gt;
            </button>
          ) : (
            <button 
              type="button"
              onClick={onComplete}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition flex items-center ml-auto"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Confirm & Pay (${grandTotal.toFixed(2)})
            </button>
          )}
        </div>

      </div>
    </div>
  );
}