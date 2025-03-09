export const calculateDailyCalory = (weight, height, age, desiredWeight) => {
  //10 * ağırlık + 6,25 * boy - 5 * yaş - 161 - 10 * (ağırlık - istenen ağırlık)
  return (
    10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight)
  );
};
