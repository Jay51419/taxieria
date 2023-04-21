import { motion } from "framer-motion";
export default function ErrorCard({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <motion.div animate={{ opacity: 1 }} className={`text-red-400 mt-1 opacity-0`}>
      {message}
    </motion.div>
  );
}
