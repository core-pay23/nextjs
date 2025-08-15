import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
export default function DebitCard({
  title = "EOA Wallet",
  value = "$0.27",
  logo,
  className = "",
  eoaAddress,
  loading,
  error,
  clientWalletAddress,
}) {
  // Parallax 3D tilt effect
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Rotate up to 8deg for a subtle 3D effect
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    // Centered values
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Normalize to [-100, 100]
    x.set(((mx - centerX) / centerX) * 100);
    y.set(((my - centerY) / centerY) * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }
  // Animation variants for the shine effect
  const shineVariants = {
    initial: {
      x: "-120%",
      opacity: 0.2,
      rotate: -20,
    },
    hover: {
      x: "120%",
      opacity: 0.7,
      rotate: 20,
      transition: {
        duration: 1.2,
        ease: [0.4, 2, 0.3, 1],
      },
    },
  };

  const handleOnClick = () =>{
    window.location.href = "/dashboard/wallet";
  }

  return (
    <motion.div
      ref={cardRef}
      className={`debit-card-animated relative rounded-2xl bg-gradient-to-br from-[#23243a] via-[#2d2e4a] to-[#1a1b2a] shadow-2xl p-6 flex flex-col justify-between min-h-[160px] overflow-hidden border border-orange-500/20 ${className} cursor-pointer`}
      style={{
        rotateX,
        rotateY,
        willChange: "transform",
        perspective: 1000,
        boxShadow: "0 6px 32px 0 rgba(219, 88, 39, 0.15), 0 1.5px 6px 0 rgba(219, 88, 39, 0.08)",
        background: "linear-gradient(135deg, #23243a 0%, #2d2e4a 30%, rgba(219, 88, 39, 0.08) 70%, #1a1b2a 100%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
      whileHover="hover"
      initial="initial"
      animate="initial"
    >
      {/* Framer Motion Shine Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        variants={shineVariants}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,165,40,0.25) 30%, rgba(219, 88, 39, 0.20) 60%, rgba(231, 129, 55, 0.15) 80%, transparent 100%)",
            filter: "blur(12px) brightness(1.8) drop-shadow(0 0 40px rgba(219, 88, 39, 0.3))",
            opacity: 0.8,
            width: "120%",
            height: "100%",
            transform: "skewX(-20deg)",
          }}
        />
      </motion.div>
      {/* Logo */}
      <div className="flex items-center justify-between mb-2">
        {/* Icon moved to top right and made bigger */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-white/20 via-orange-400/20 to-orange-600/20 shadow-lg"
            whileHover={{ scale: 1.15, rotate: 12 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/icon.png"
              alt="CorePay Logo"
              width={924}
              height={924}
              className="w-full h-full"
              priority
            />
          </motion.div>
        </div>
      </div>
      {/* Card Content */}
      <div className="flex flex-col gap-2 mt-2">
        <h3 className="text-base font-semibold text-white/80 tracking-wide">
          {title}
        </h3>
        <div
          className="text-xs font-mono font-bold text-white break-all"
        >
          {loading
            ? "Loading..."
            : error
            ? "Error"
            : (eoaAddress && typeof eoaAddress === "string" && eoaAddress.length > 12
                ? `${eoaAddress.slice(0, 6)}...${eoaAddress.slice(-4)}`
                : eoaAddress)
          }
        </div>
      </div>
      {/* Decorative bottom bar */}
      <motion.div
        className="absolute left-0 bottom-0 w-full h-2 rounded-b-2xl bg-gradient-to-r from-orange-600/60 via-orange-500/60 to-orange-400/60 shadow-lg"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1, scaleX: 1.05, boxShadow: "0 0 20px rgba(219, 88, 39, 0.4)" }}
        transition={{ type: "spring", stiffness: 200 }}
      />
    </motion.div>
  );
}
