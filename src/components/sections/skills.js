import React, { useEffect, useRef } from 'react';
import { skills } from '../skills';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';
import { srConfig } from '@config';
import sr from '@utils/sr';

const SkillsSection = styled.section`
  max-width: 960px;
  margin: 0 auto 2rem;
  padding: 1.5rem 1.5rem;
  max-width: 900px;

.inner {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 50px;

  @media (max-width: 768px) {
    display: block;
  }
}
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
`;

const Skill = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 0.625rem;
  padding-top: 0.75rem;
  border-radius: 0.375rem;
  margin-top: 0.625rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.65, 0, 0.076, 1);

  &:hover {
    border-color: rgba(128, 128, 128, 0.3);
    backdrop-filter: saturate(180%) blur(14px);
    background: #ffffff18;
  }
`;

const SkillIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.625rem;
`;

const SkillName = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  color: var(--slate);
`;

const SkillTech = styled.p`
  margin-top: 0.5rem;
  font-size: 0.65rem;
  line-height: 1;
  color: var(--green);
`;

export default function Skills() {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);
  return (
    <SkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skillset</h2>
      <SkillsGrid>
        {skills.map(({ icon, name, tech }, index) => (
          <Skill
            key={index}
            className="wow fadeIn"
            style={{
              animationDelay: `${index * 100 + 100}ms`,
            }}
          >
            <div className="flex items-center">
              <div className="w-5 h-5 mr-5">
                <SkillIcon src={icon} alt={name} />
              </div>
              <div>
                <SkillName>{name}</SkillName>
                <SkillTech>{tech}</SkillTech>
              </div>
            </div>
          </Skill>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
}
