module.exports = (api) => {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: ["nativewind/babel", "react-native-paper/babel"],
	};
};
