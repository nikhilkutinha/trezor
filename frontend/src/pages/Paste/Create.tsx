import Default from "../../layouts/Default";
import NavLink from "../../components/NavLink";
import { useForm } from "../../utils/useForm";
import { IconDeviceFloppy, IconEraser } from "@tabler/icons";
import { Paste } from "../../services";
import Editor from "../../components/Editor";
import { useHistory } from "react-router-dom";
import Select from "../../components/form/Select";

enum Expiration {
	Never,
	Hour,
	Day,
	Week,
	Month,
}

function Create() {
	const history = useHistory();

	const { form, setForm } = useForm({
		text: "",
		language: "",
		expiration_date: "0",
	});

	const resetText = () => {
		setForm("text", "");
	};

	const createPaste = () => {
		const { passphrase, encrypted: text } = Paste.encrypt(form.text);

		Paste.create({ ...form, text }).then(({ status, data }) => {
			if (status === 200) {
				// Paste.claim(data.uuid, data.owner_key);
				history.push(`/${data.uuid}${passphrase}`);
			}
		});
	};

	return (
		<Default
			navigation={
				<div className="flex flex-col h-full justify-between">
					<nav className="space-y-1.5">
						<NavLink as="button" onClick={createPaste}>
							<div className="flex items-center text-white">
								<IconDeviceFloppy className="w-5 h-5" />
								<span className="ml-2 text-sm">Save</span>
							</div>
						</NavLink>

						<NavLink as="button" onClick={resetText}>
							<div className="flex items-center text-white">
								<IconEraser className="w-5 h-5" />
								<span className="ml-2 text-sm">Reset</span>
							</div>
						</NavLink>
					</nav>

					<header className="space-y-1.5">
						<Select
							value={form.language}
							onChange={(e) => setForm("language", e.target.value)}
						>
							<option value="">Plain text</option>
							<option value="typescript">TypeScript</option>
							<option value="javascript">JavaScript</option>
							<option value="css">CSS</option>
							<option value="less">LESS</option>
							<option value="scss">SCSS</option>
							<option value="json">JSON</option>
							<option value="html">HTML</option>
							<option value="xml">XML</option>
							<option value="php">PHP</option>
							<option value="csharp">C#</option>
							<option value="cpp">C++</option>
							<option value="razor">Razor</option>
							<option value="markdown">Markdown</option>
							<option value="diff">Diff</option>
							<option value="java">Java</option>
							<option value="vb">VB</option>
							<option value="coffeescript">CoffeeScript</option>
							<option value="handlebars">Handlebars</option>
							<option value="batch">Batch</option>
							<option value="pug">Pug</option>
							<option value="f">F</option>#<option value="lua">Lua</option>
							<option value="powershell">Powershell</option>
							<option value="python">Python</option>
							<option value="ruby">Ruby</option>
							<option value="sass">SASS</option>
							<option value="r">R</option>
							<option value="objective-c">Objective-C</option>
						</Select>

						<Select
							value={form.expiration_date}
							onChange={(e) => setForm("expiration_date", e.target.value)}
						>
							<option value={Expiration.Never}>Never expire</option>
							<option value={Expiration.Hour}>Expire in 1 hour</option>
							<option value={Expiration.Day}>Expire in 1 day</option>
							<option value={Expiration.Week}>Expire in 1 week</option>
							<option value={Expiration.Month}>Expire in 1 month</option>
						</Select>
					</header>
				</div>
			}
		>
			<div className="h-full relative">
				<Editor
					text={form.text}
					className="absolute inset-0 w-full h-full"
					language={form.language}
					onChange={(value) => setForm("text", value)}
				/>
			</div>
		</Default>
	);
}

export default Create;
