export default function Footer() {
    return (
        <>
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
            <a
            href="https://github.com/abrarfrahman/abrartisan-ai"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
            >
            <h2 className={`mb-3 text-2xl font-semibold`}>
                Code{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
                </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                See the GitHub repository for instructions to deploy this project.
            </p>
            </a>

            <a
            href="https://www.loom.com/share/fff62f6a7f7b4d10bd92b58ac17a9f4f?sid=40d1898d-4962-4d23-b123-bf54ffb95d1a"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer"
            >
            <h2 className={`mb-3 text-2xl font-semibold`}>
                Watch{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
                </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Loom video describing the design, implementation, and test procedures.
            </p>
            </a>

            <a
            href="https://abrarrahman.com/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
            >
            <h2 className={`mb-3 text-2xl font-semibold`}>
                Connect{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
                </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Add Abrar on LinkedIn, Twitter, or GitHub to stay in touch.
            </p>
            </a>
        </div>
    </>
    );
}