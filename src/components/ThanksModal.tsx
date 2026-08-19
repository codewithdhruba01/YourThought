import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ThanksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThanksModal({ isOpen, onClose }: ThanksModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg aspect-4/3 flex flex-col items-center justify-center"
          >
            {/* Parchment Background */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl"
              style={{
                backgroundImage: `url('/parchment.svg')`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.5))',
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-8 top-8 md:right-12 md:top-12 text-[#5a4a35] hover:text-[#3d3224] transition-colors z-20"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="relative z-10 text-center px-12 md:px-20">
              <h2 className="font-brand text-4xl md:text-5xl text-[#3d3224] mb-4">
                Thank You!
              </h2>
              <p className="font-serif text-lg md:text-xl text-[#5a4a35] leading-relaxed">
                Your thought has been added to the list. <br />
                We appreciate you taking the time to share something kind.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
