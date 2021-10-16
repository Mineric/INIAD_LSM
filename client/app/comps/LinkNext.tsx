import NextLink from 'next/link';

export { LinkNext };

function LinkNext({ href, children, ...props }) {
    return (
        <NextLink href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}