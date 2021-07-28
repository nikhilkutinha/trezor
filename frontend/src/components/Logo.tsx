function Logo() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="142"
			height="44"
			viewBox="0 0 142 44"
		>
			<text
				id="trezor_bin"
				data-name="trezor bin"
				transform="translate(0 36)"
				fill="#10b981"
				fontSize="33"
				fontFamily="SegoeUI-BoldItalic, Segoe UI"
				fontWeight="700"
				fontStyle="italic"
			>
				<tspan x="0" y="0">
					trezor
				</tspan>
				<tspan y="0" fill="#fff">
					{" "}
				</tspan>
				<tspan
					y="0"
					fill="#fff"
					fontFamily="SegoeUI-LightItalic, Segoe UI"
					fontWeight="300"
				>
					bin
				</tspan>
			</text>
		</svg>
	);
}

export default Logo;
