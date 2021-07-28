import { useState, useEffect, useMemo } from "react";
import Default from "../../layouts/Default";
import NavLink from "../../components/NavLink";
import Highlight from "react-highlight";
import { IconCirclePlus, IconClipboard } from "@tabler/icons";
import { Paste } from "../../services";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface IPaste {
	text?: string;
	language?: string;
}

function Create() {
	const [paste, setPaste] = useState<IPaste>();

	const { id } = useParams<{ id: string }>();
	const { hash: passphrase } = useLocation();

	const decryptedText = useMemo(() => {
		const { text } = Paste.decrypt(paste?.text, passphrase);
		return text;
	}, [paste, passphrase]);

	useEffect(() => {
		Paste.get(id).then(({ data }) => {
			setPaste(data);
		});
	}, [id]);

	return (
		<Default
			navigation={
				<nav className="space-y-1.5">
					<NavLink as="link" to="/">
						<div className="flex items-center text-white">
							<IconCirclePlus className="w-5 h-5" />
							<span className="ml-2 text-sm">New</span>
						</div>
					</NavLink>

					<NavLink as="button">
						<div
							className="flex items-center text-white"
							onClick={() => navigator.clipboard.writeText(decryptedText || "")}
						>
							<IconClipboard className="w-5 h-5" />
							<span className="ml-2 text-sm">Copy</span>
						</div>
					</NavLink>
				</nav>
			}
		>
			<div className="h-full overflow-auto px-5 py-4">
				<Highlight className={`${paste?.language || 'text'} text-sm`}>
					{decryptedText}
				</Highlight>
			</div>
		</Default>
	);
}

export default Create;
