import React from 'react';
import { skills } from '../skills';
import styled from 'styled-components';

const SkillsSection = styled.section`
  max-width: 960px;
  margin: 0 auto 2rem;
  padding: 0 1.5rem;
`;

const SkillsHeading = styled.h1`
  text-transform: uppercase;
  text-align: start;
  font-size: 1.5rem;
  padding-top: 1.25rem;
  color: #7d7d7e;
  span {
    color: #fff;
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
  color: #fff;
`;

const SkillTech = styled.p`
  margin-top: 0.5rem;
  font-size: 0.65rem;
  line-height: 1;
  color: #fff;
`;

export default function Skills() {
  return (
    <SkillsSection id="skills">
      <SkillsHeading>
        Technologies <span>Skills</span>
      </SkillsHeading>
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
