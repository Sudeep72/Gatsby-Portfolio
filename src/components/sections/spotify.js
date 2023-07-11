import React, { useEffect } from 'react';
import useSWR from 'swr';
import { animate } from 'motion';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  padding: 2rem;
`;

const CardContent = styled.p`
  color: #e5e7eb;
  font-size: 16px;
`;

const Logo = styled.div`
  display: flex;
  height: 24px;
  width: 24px;
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const AnimatedBarContainer = styled.div`
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  margin-right: 0.5rem;
`;

const AnimatedBarWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  margin-right: 0.5rem;
  padding-top: 1rem;
`;

const AnimatedBar = styled.span`
  height: ${({ height }) => height}px;
  width: 2px;
  margin-right: 3px;
  background-color: #8892b5;
  opacity: 0.75;
`;

function AnimatedBars() {
  useEffect(() => {
    animate(
      '#bar1',
      {
        scaleY: [1.0, 1.5, 1.0],
        translateY: ['0rem', '-0.082rem', '0rem'],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: 'ease-in-out',
      },
    );
    animate(
      '#bar2',
      {
        scaleY: [1.0, 3, 1.0],
        translateY: ['0rem', '-0.083rem', '0rem'],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: 'ease-in-out',
      },
    );
    animate(
      '#bar3',
      {
        scaleY: [1.0, 0.5, 1.0],
        translateY: ['0rem', '0.37rem', '0rem'],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: 'ease-in-out',
      },
    );
  }, []);

  return (
    <AnimatedBarContainer>
      <AnimatedBar id="bar1" height={8} />
      <AnimatedBar id="bar2" height={5} />
      <AnimatedBar id="bar3" height={13} />
    </AnimatedBarContainer>
  );
}

const fetcher = url => fetch(url).then(res => res.json());

export default function Spotify() {
  const { data, error, isLoading } = useSWR(
    'https://glassfolio-test.vercel.app/api/now-playing',
    fetcher,
  );

  if (error) {
    return 'Turn On the Internet to know the activity.';
  }
  if (isLoading) {
    return 'Loading...';
  }

  return (
    <CardWrapper>
      <CardContent>
        <div className="mb-2 flex w-full flex-row items-center">
          {data?.songUrl ? (
            <AnimatedBarWrapper>
              <AnimatedBars />
            </AnimatedBarWrapper>
          ) : (
            <Logo>
              <svg className="logo" viewBox="0 0 168 168">
                <path
                  fill="#1ED760"
                  d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
                />
              </svg>
            </Logo>
          )}
          <div className="inline-flex w-full max-w-full flex-col truncate sm:flex-row">
            {data?.songUrl ? (
              <a
                className="capsize max-w-max truncate font-medium text-gray-200"
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer">
                {data.title.length > 25 ? `${data.title.slice(0, 25)}...` : data.title}
              </a>
            ) : (
              <p className="capsize font-medium text-gray-200">Not Playing - Spotify</p>
            )}
          </div>
        </div>
      </CardContent>
    </CardWrapper>
  );
}