import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import useSetting from "@/hooks/api/useSetting";

const Migration = () => {
  const [loading, setLoading] = useState(true);
  const [migration, setMigration] = useState<boolean>(false);
  const [startAt, setStartAt] = useState<Date | null>(null);
  const [endAt, setEndAt] = useState<Date | null>(null);
  const [remaining, setRemaining] = useState<string>("");

  const fetchMigration = async () => {
    try {
      const response = await useSetting.getMigrationState();

      if (!response.ok) {
        console.warn("Migration API error:", response.error);
        return;
      }

      setMigration(response.migration!);
      setStartAt(response.migration_start_at!);
      setEndAt(response.migration_end_at!);
    } catch (e) {
      console.error("Migration fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMigration();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!endAt) return;

    const timer = setInterval(() => {
      const diff = endAt.getTime() - Date.now();

      if (diff <= 0) {
        setRemaining("0h 0m 0s");
        clearInterval(timer);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setRemaining(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [endAt]);

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4 text-lg">
          Loading migration status…
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-6 items-center justify-center">
      <Text className="text-3xl font-bold text-white mb-4">
        🚧 Server Migration In Progress
      </Text>

      <Text className="text-white text-base opacity-80 text-center">
        We are upgrading our servers to improve performance, security, and
        stability.
      </Text>

      {startAt && endAt && (
        <View className="mt-6 p-4 bg-black-900 rounded-xl border border-gray-700 w-full">
          <Text className="text-gray-400 text-sm">Migration Window:</Text>
          <Text className="text-white mt-1 text-base">
            {startAt.toLocaleString()} → {endAt.toLocaleString()}
          </Text>
        </View>
      )}

      {remaining !== "" && (
        <Text className="mt-8 text-2xl font-semibold text-yellow-400">
          Time Remaining: {remaining}
        </Text>
      )}

      <Text className="mt-10 text-gray-400 text-sm text-center">
        Thank you for your patience.{"\n"}
        The system will resume automatically once migration ends.
      </Text>
    </View>
  );
};

export default Migration;
