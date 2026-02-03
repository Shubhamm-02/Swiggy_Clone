"use client";
import React, { useEffect, useState } from 'react';

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    window.addEventListener('open-login', onOpen as EventListener);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('open-login', onOpen as EventListener);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

      {/* Slide-in panel */}
      <div className="relative ml-auto w-full max-w-[420px] h-full bg-white shadow-xl p-8 overflow-auto">
        <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>

        <div className="max-w-[320px] mx-auto mt-8">
          <h2 className="text-2xl font-extrabold mb-2">Login</h2>
          <p className="text-sm text-gray-500 mb-6">or <button type="button" onClick={(e) => e.preventDefault()} className="text-swiggy-orange bg-transparent border-0 cursor-default p-0 font-inherit">create an account</button></p>

          <label className="block text-xs text-gray-600 mb-2">Phone number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="Enter phone number"
            className="w-full border border-gray-200 rounded px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-swiggy-orange"
          />

          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="w-full bg-swiggy-orange text-white py-3 rounded font-semibold hover:brightness-95 transition cursor-pointer"
          >
            LOGIN
          </button>

          <p className="text-[11px] text-gray-500 mt-4">By clicking on Login, I accept the <button type="button" onClick={(e) => e.preventDefault()} className="underline bg-transparent border-0 cursor-default p-0 font-inherit">Terms & Conditions</button> & <button type="button" onClick={(e) => e.preventDefault()} className="underline bg-transparent border-0 cursor-default p-0 font-inherit">Privacy Policy</button></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
