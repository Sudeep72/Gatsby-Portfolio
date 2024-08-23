/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
  }

  .github-stats {
    margin-top: 10px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
    }
    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }

  .last-updated {
    margin-top: 10px;
    font-size: var(--fz-xxs);
    color: var(--slate);
  }
`;

const Footer = () => {
  // const [githubInfo, setGitHubInfo] = useState({
  //   stars: null,
  //   forks: null,
  // });
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Fetch GitHub repo stats
    // fetch('https://api.github.com/repos/Sudeep72/Gatsby-Portfolio')
    //   .then(response => response.json())
    //   .then(json => {
    //     const { stargazers_count, forks_count } = json;
    //     setGitHubInfo({
    //       stars: stargazers_count,
    //       forks: forks_count,
    //     });
    //   })
    //   .catch(e => console.error(e));

    fetch('https://api.github.com/repos/Sudeep72/Gatsby-Portfolio/commits?sha=main&per_page=1')
      .then(response => response.json())
      .then(json => {
        const lastCommitDate = new Date(json[0].commit.committer.date);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }).format(lastCommitDate);
        setLastUpdated(formattedDate);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit tabindex="-1">
        <a href="https://github.com/Sudeep72/Gatsby-Portfolio" target="_blank" rel="noreferrer">
          <div>Revamped &amp; Built by Sudeep</div>

          {/* {githubInfo.stars && githubInfo.forks && (
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          )} */}
        </a>

        <h4>Copyright ©️ {new Date().getFullYear()}</h4>
        <div>
          <a href="https://sudeep-omega.vercel.app/" target="_blank" rel="noreferrer">
            {' '}
            View Old Site
          </a>
        </div>
        <text>
          <a href="https://github.com/bchiang7/v4" target="_blank" rel="noreferrer">
            Adapted from the Brittany Chiang Portfolio
          </a>
        </text>
        {lastUpdated && <div className="last-updated">Last updated: {lastUpdated}</div>}
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
