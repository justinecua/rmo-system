// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
};
