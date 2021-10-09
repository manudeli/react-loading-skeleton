import React, {
    PropsWithChildren,
    useState,
    useEffect,
    useRef,
    ReactElement,
} from 'react'
import { Meta } from '@storybook/react'
import { SideBySide } from './components'
import { Skeleton } from '../Skeleton'

const Box = ({ children }: PropsWithChildren<unknown>) => (
    <div
        style={{
            border: '1px solid #ccc',
            fontSize: 16,
            lineHeight: 2,
            padding: 20,
            marginBottom: 10,
            width: 100,
        }}
    >
        {children}
    </div>
)

export default {
    component: Skeleton,
    title: 'Skeleton',
} as Meta

// TODO remove wrapper div, set width on skeleton directly. Currently width is bugged with multiple skeleton count.
export const Basic: React.VFC = () => (
    <div style={{ width: 400 }}>
        <Skeleton count={5} />
    </div>
)

export const WithWrapper: React.VFC = () => (
    <SideBySide>
        <Skeleton count={5} wrapper={Box} />
        <div>
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
            <Box>D</Box>
        </div>
    </SideBySide>
)

export const DifferentDurations: React.VFC = () => (
    <div>
        <Skeleton duration={1} />
        <Skeleton duration={2} />
        <Skeleton duration={3} />
        <Skeleton duration={4} />
    </div>
)

export const DifferentWidths: React.VFC = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton />
        <Skeleton width={50} />
        <Skeleton width={100} />
        <Skeleton width={200} />
        <Skeleton width="50em" />
    </div>
)

export const DifferentHeights: React.VFC = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton />
        <Skeleton height={200} />
        <Skeleton height={400} />
        <Skeleton height={600} />
        <Skeleton height="50em" />
    </div>
)

export const CustomStyles: React.VFC = () => (
    <Skeleton height="100px" style={{ borderRadius: 10, height: 50, width: 50 }} />
)

export const Circle: React.VFC = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton height={50} width={50} circle />
    </div>
)

interface HeightComparisonProps {
    title: string
}

function HeightComparison({
    title,
    children,
}: PropsWithChildren<HeightComparisonProps>): ReactElement {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [height, setHeight] = useState<number>()

    useEffect(() => {
        setHeight(wrapperRef.current?.clientHeight)
    }, [])

    return (
        <div style={{ marginRight: '4rem', maxWidth: 350 }}>
            <h4>{title}</h4>

            <div ref={wrapperRef} style={{ marginBottom: '1rem', lineHeight: 3 }}>
                {children}
            </div>

            <div>Expected height: 30</div>
            <div>Actual height: {height}</div>
        </div>
    )
}

export const HeightQuirk: React.VFC = () => (
    <div>
        <p>
            This is a demonstration of a Skeleton quirk that was reported in{' '}
            <a href="https://github.com/dvtng/react-loading-skeleton/issues/23">#23</a>.
        </p>
        <p>
            If you set the Skeleton&apos;s height to 30px, the element containing the
            Skeleton will have a height of 31px, assuming the document&apos;s line-height
            is left at the default value. The height discrepancy increases with
            line-height.
        </p>
        <p>
            This example uses a large line-height to magnify the issue. It compares a
            Skeleton with <code>height: 30px</code> to a normal span tag with{' '}
            <code>height: 30px; display: inline-block; line-height: 1;</code>. The height
            discrepancy occurs in both cases which suggests that this is not a Skeleton
            bug.
        </p>
        <div style={{ display: 'flex', marginBottom: '3rem' }}>
            <HeightComparison title="<Skeleton />">
                <Skeleton height={30} />
            </HeightComparison>
            <HeightComparison title="<span>">
                <span
                    style={{
                        height: '30px',
                        display: 'inline-block',
                        lineHeight: 1,
                        backgroundColor: 'lemonchiffon',
                    }}
                >
                    TEST
                </span>
            </HeightComparison>
        </div>
        <h2>Solution</h2>
        <p>
            To make the element that contains the Skeleton exactly 30px tall, you can
            provide a <code>containerClassName</code> and apply the styles{' '}
            <code>display: block; line-height: 1;</code> to that class.
        </p>
        <HeightComparison title='<Skeleton containerClassName="..." />'>
            <Skeleton height={30} containerClassName="height-quirk-custom-container" />
        </HeightComparison>
    </div>
)

// export const WrapperAndTheme: React.VFC = () => (
//     <SideBySide>
//         <SkeletonTheme color="#333" highlightColor="#666">
//             <Skeleton count={5} wrapper={Box} />
//         </SkeletonTheme>
//         <div>
//             <Box key={1}>A</Box>
//             <Box key={2}>B</Box>
//         </div>
//     </SideBySide>
// )

// export const LightTheme: React.VFC = () => {
//     const [theme, setTheme] = React.useState('light')
//     const skeletonColor =
//         theme === 'light' ? 'rgba(0, 0, 0, .1)' : 'rgba(255, 255, 255, .1)'
//     const skeletonHighlight =
//         theme === 'light' ? 'rgba(0, 0, 0, .2)' : 'rgba(255,255,255, .2)'

//     const handleToggle = () => {
//         setTheme((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light'))
//     }

//     const backgroundColor = theme === 'light' ? 'white' : '#222'

//     return (
//         <div style={{ backgroundColor }}>
//             <button onClick={handleToggle}>Toggle Theme</button>
//             <SideBySide>
//                 <SkeletonTheme color={skeletonColor} highlightColor={skeletonHighlight}>
//                     <Skeleton count={5} wrapper={Box} />
//                 </SkeletonTheme>
//                 <div>
//                     <Box key={1}>A</Box>
//                     <Box key={2}>B</Box>
//                 </div>
//             </SideBySide>
//         </div>
//     )
// }
