import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.isDarkMode ? '#000000' : '#FFFFFF'};
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
`;

const SignalIcon = styled(motion.img)`
  position: absolute;
  width: 24px;
  height: 24px;
  opacity: 0.5;
  z-index: 1;
`;

const TopLeftSignal = styled(SignalIcon)`
  top: calc(var(--spacing-unit) * 3);
  left: calc(var(--spacing-unit) * 3);
`;

const TopRightSignal = styled(SignalIcon)`
  top: 20px;
  right: 20px;
`;

const BottomLeftSignal = styled(SignalIcon)`
  bottom: 20px;
  left: 20px;
`;

const BottomRightSignal = styled(SignalIcon)`
  bottom: 20px;
  right: 20px;
`;

const Header = styled(motion.header)`
  padding: calc(var(--spacing-unit) * 3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled(motion.img)`
  height: 40px;
  margin-right: calc(var(--spacing-unit) * 4);
  filter: ${props => props.theme.isDarkMode ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' : 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))'};
  transition: filter 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  gap: calc(var(--spacing-unit) * 4);
  align-items: center;
`;

const NavLink = styled(motion.a)`
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  text-decoration: none;
  font-weight: 500;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.05em;
  position: relative;
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 2);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 8px;
    transform: scale(0.8);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover::before {
    transform: scale(1);
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 80%;
  }
`;

const ThemeToggle = styled(motion.button)`
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  padding: calc(var(--spacing-unit) * 1.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Main = styled.main`
  flex: 1;
  padding-top: 80px;
`;

const Hero = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 calc(var(--spacing-unit) * 3);
  position: relative;
  background: ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--spacing-unit) * 4);
`;

const HumanoidLogo = styled(motion.img)`
  position: absolute;
  width: 80%;
  height: 80%;
  object-fit: contain;
  opacity: ${props => props.theme.isDarkMode ? 0.25 : 0.15};
  z-index: 1;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: ${props => props.theme.isDarkMode 
    ? 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))' 
    : 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.3))'};
  animation: zoomInOut 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @keyframes zoomInOut {
    0% {
      transform: translate(-50%, -50%) scale(0.8) translateZ(0);
      filter: ${props => props.theme.isDarkMode 
        ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))' 
        : 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.2))'};
    }
    25% {
      transform: translate(-50%, -50%) scale(1.2) translateZ(50px);
      filter: ${props => props.theme.isDarkMode 
        ? 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))' 
        : 'drop-shadow(0 0 40px rgba(0, 0, 0, 0.4))'};
    }
    50% {
      transform: translate(-50%, -50%) scale(1) translateZ(0);
      filter: ${props => props.theme.isDarkMode 
        ? 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))' 
        : 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.3))'};
    }
    75% {
      transform: translate(-50%, -50%) scale(0.8) translateZ(-50px);
      filter: ${props => props.theme.isDarkMode 
        ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))' 
        : 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.2))'};
    }
    100% {
      transform: translate(-50%, -50%) scale(0.8) translateZ(0);
      filter: ${props => props.theme.isDarkMode 
        ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))' 
        : 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.2))'};
    }
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: linear-gradient(
    45deg,
    ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'} 0%,
    ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} 50%,
      transparent 100%
    );
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.5s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.25rem, 3vw, 2rem);
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  font-weight: 500;
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  font-weight: 400;
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.05em;
`;

const CTAButton = styled(motion.button)`
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border: 1px solid ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 0%,
      transparent 70%
    );
    opacity: 0;
    transform: scale(0);
    transition: all 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  }

  &:hover::before {
    transform: translateX(100%);
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  span {
    position: relative;
    z-index: 1;
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: scale(1.05);
  }
`;

const ContactSection = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing-unit) * 8) calc(var(--spacing-unit) * 3);
  position: relative;
  background: ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const ContactContainer = styled(motion.div)`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 8);
  position: relative;
  z-index: 1;
`;

const ContactHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: calc(var(--spacing-unit) * 4);
`;

const ContactTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: linear-gradient(
    45deg,
    ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'} 0%,
    ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
`;

const ContactSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.05em;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(var(--spacing-unit) * 6);
`;

const ContactCard = styled(motion.div)`
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  border-radius: 20px;
  padding: calc(var(--spacing-unit) * 6);
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const CardTitle = styled.h2`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  margin-bottom: calc(var(--spacing-unit) * 4);
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} 0%,
      transparent 100%
    );
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 3);
`;

const ContactItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 1);
`;

const ContactLabel = styled.span`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
  font-family: 'Orbitron', sans-serif;
`;

const ContactValue = styled(motion.a)`
  font-size: 1.125rem;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1);
  padding: calc(var(--spacing-unit) * 1) 0;

  &:hover {
    opacity: 0.8;
    transform: translateX(5px);
  }
`;

const ContactDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  margin-top: calc(var(--spacing-unit) * 2);
  font-family: 'Orbitron', sans-serif;
  line-height: 1.6;
`;

const DecorativeLine = styled(motion.div)`
  width: 100px;
  height: 2px;
  background: linear-gradient(
    90deg,
    ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} 0%,
    transparent 100%
  );
  margin: calc(var(--spacing-unit) * 4) auto;
  transform-origin: left;
`;

const FeaturesSection = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing-unit) * 8) calc(var(--spacing-unit) * 3);
  position: relative;
  background: ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const FeaturesContainer = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 8);
  position: relative;
  z-index: 1;
`;

const FeaturesHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: calc(var(--spacing-unit) * 4);
`;

const FeaturesTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: linear-gradient(
    45deg,
    ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'} 0%,
    ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
`;

const FeaturesSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.05em;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(var(--spacing-unit) * 6);
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  border-radius: 20px;
  padding: calc(var(--spacing-unit) * 6);
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const FeatureIcon = styled(motion.div)`
  width: 48px;
  height: 48px;
  margin-bottom: calc(var(--spacing-unit) * 3);
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  opacity: 0.8;
  position: relative;
  transform-origin: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    border: 2px solid ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1.5);
  }

  &:hover::after {
    transform: translate(-50%, -50%) scale(1.2);
  }

  svg {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 10px ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'});
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const FeatureTitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  margin: 0;
`;

const FeatureDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  font-family: 'Orbitron', sans-serif;
  line-height: 1.6;
  margin: 0;
`;

const AboutSection = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing-unit) * 8) calc(var(--spacing-unit) * 3);
  position: relative;
  background: ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const AboutContainer = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 8);
  position: relative;
  z-index: 1;
`;

const AboutHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: calc(var(--spacing-unit) * 4);
`;

const AboutMainTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: linear-gradient(
    45deg,
    ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'} 0%,
    ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
`;

const AboutSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.05em;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const AboutGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(var(--spacing-unit) * 6);
`;

const AboutCard = styled(motion.div)`
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  border-radius: 20px;
  padding: calc(var(--spacing-unit) * 6);
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} 50%,
      transparent 100%
    );
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
    background: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const AboutIcon = styled(motion.div)`
  width: 64px;
  height: 64px;
  margin-bottom: calc(var(--spacing-unit) * 3);
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  opacity: 0.8;
  position: relative;
  transform-origin: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    border: 2px solid ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1.5);
  }

  &:hover::after {
    transform: translate(-50%, -50%) scale(1.2);
  }

  svg {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 10px ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'});
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg) scale(1); }
    25% { transform: translateY(-10px) rotate(5deg) scale(1.1); }
    50% { transform: translateY(0px) rotate(0deg) scale(1); }
    75% { transform: translateY(10px) rotate(-5deg) scale(0.9); }
    100% { transform: translateY(0px) rotate(0deg) scale(1); }
  }
`;

const AboutCardTitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  margin: 0;
`;

const AboutDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  font-family: 'Orbitron', sans-serif;
  line-height: 1.6;
  margin: 0;
`;

const ContactRole = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  margin: 0 0 calc(var(--spacing-unit) * 2) 0;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ContactName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
  margin: 0 0 calc(var(--spacing-unit) * 3) 0;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ContactPhone = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-family: 'Orbitron', sans-serif;
`;

const ContactEmail = styled.a`
  font-size: 1rem;
  color: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.isDarkMode ? '#FFFFFF' : '#000000'};
    text-decoration: underline;
  }
`;

const ParticlesContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Particle = styled(motion.div)<{ size: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  pointer-events: none;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size}px 
    ${props => props.theme.isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number;
    size: number;
    duration: number;
    angle: number;
    distance: number;
  }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Crear múltiples partículas en cada movimiento
      const particleCount = 3;
      const newParticles = Array.from({ length: particleCount }, () => ({
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 2, // Tamaño aleatorio entre 2 y 6
        duration: Math.random() * 0.5 + 1, // Duración aleatoria entre 1 y 1.5 segundos
        angle: Math.random() * Math.PI * 2, // Ángulo aleatorio
        distance: Math.random() * 50 + 50 // Distancia aleatoria entre 50 y 100
      }));
      
      setParticles(prev => {
        const updated = [...prev, ...newParticles];
        // Mantener solo las últimas 30 partículas
        return updated.slice(-30);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const renderSection = () => {
    switch(currentSection) {
      case 'contact':
        return (
          <ContactSection>
            <ContactContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <ContactHeader
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ContactTitle>Conecta con Aura</ContactTitle>
                <ContactSubtitle>
                  Ya sea que busques crear tu asistente conversacional o conocer más sobre nosotros, 
                  estamos aquí para ayudarte en tu transformación digital.
                </ContactSubtitle>
              </ContactHeader>

              <ContactGrid>
                <ContactCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <CardTitle>Director Comercial</CardTitle>
                  <ContactInfo>
                    <ContactItem>
                      <ContactLabel>Nombre</ContactLabel>
                      <ContactValue>Mauro Rosado</ContactValue>
                    </ContactItem>
                    <ContactItem>
                      <ContactLabel>Teléfono</ContactLabel>
                      <ContactValue 
                        href="tel:+524271079011"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🇲🇽 +52 427 107 9011
                      </ContactValue>
                    </ContactItem>
                    <ContactItem>
                      <ContactLabel>Email</ContactLabel>
                      <ContactValue 
                        href="mailto:mauro.rosado@aura.ai"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        mauro.rosado@aura.ai
                      </ContactValue>
                    </ContactItem>
                  </ContactInfo>
                  <ContactDescription>
                    Para la creación de asistentes conversacionales, cotizaciones y demos personalizados.
                    Desarrollamos soluciones de IA conversacional adaptadas a tus necesidades.
                  </ContactDescription>
                </ContactCard>

                <ContactCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <CardTitle>Recepcionista Virtual</CardTitle>
                  <ContactInfo>
                    <ContactItem>
                      <ContactLabel>Nombre</ContactLabel>
                      <ContactValue>Aura</ContactValue>
                    </ContactItem>
                    <ContactItem>
                      <ContactLabel>Teléfono</ContactLabel>
                      <ContactValue 
                        href="tel:+525512345678"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🇲🇽 +52 55 1234 5678
                      </ContactValue>
                    </ContactItem>
                    <ContactItem>
                      <ContactLabel>Email</ContactLabel>
                      <ContactValue 
                        href="mailto:aura@aura.ai"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        aura@aura.ai
                      </ContactValue>
                    </ContactItem>
                  </ContactInfo>
                  <ContactDescription>
                    Nuestra recepcionista virtual está disponible para resolver tus dudas sobre la empresa,
                    nuestros servicios y el mundo de la IA conversacional. Disponible 24/7.
                  </ContactDescription>
                </ContactCard>
              </ContactGrid>
            </ContactContainer>
          </ContactSection>
        );
      case 'about':
        return (
          <AboutSection>
            <AboutContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <AboutHeader
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <AboutMainTitle>Acerca de Aura</AboutMainTitle>
                <AboutSubtitle>
                  Transformando la comunicación empresarial con inteligencia artificial
                </AboutSubtitle>
              </AboutHeader>

              <AboutGrid>
                <AboutCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <AboutIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </AboutIcon>
                  <AboutCardTitle>Nuestra Misión</AboutCardTitle>
                  <AboutDescription>
                    Desarrollamos soluciones de IA conversacional que transforman la forma en que las empresas
                    interactúan con sus clientes, haciendo la comunicación más eficiente y personalizada.
                  </AboutDescription>
                </AboutCard>

                <AboutCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <AboutIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </AboutIcon>
                  <AboutCardTitle>Nuestro Equipo</AboutCardTitle>
                  <AboutDescription>
                    Contamos con un equipo de expertos en IA, desarrollo y experiencia de usuario,
                    comprometidos con la innovación y la excelencia en cada proyecto.
                  </AboutDescription>
                </AboutCard>

                <AboutCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <AboutIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </AboutIcon>
                  <AboutCardTitle>Nuestros Valores</AboutCardTitle>
                  <AboutDescription>
                    Innovación, excelencia y compromiso con nuestros clientes son los pilares
                    que guían nuestro trabajo y desarrollo de soluciones tecnológicas.
                  </AboutDescription>
                </AboutCard>
              </AboutGrid>
            </AboutContainer>
          </AboutSection>
        );
      default:
        return (
          <>
            <Hero>
              <HumanoidLogo
                src={isDarkMode ? './logo_white.png' : './logo_black.png'}
                alt="Humanoid Background"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: isDarkMode ? 0.4 : 0.15,
                  scale: 1
                }}
                transition={{ 
                  duration: 2,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{
                  animation: 'zoomInOut 8s cubic-bezier(0.4, 0, 0.2, 1) infinite'
                }}
              />
              <HeroContent
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Title
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    textShadow: [
                      "0 0 20px rgba(255, 255, 255, 0.1)",
                      "0 0 30px rgba(255, 255, 255, 0.2)",
                      "0 0 20px rgba(255, 255, 255, 0.1)"
                    ]
                  }}
                  transition={{ 
                    duration: 0.8,
                    textShadow: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                >
                  AURA
                </Title>
                <Subtitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Voice AI Agents
                </Subtitle>
                <DecorativeLine
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
                <Description
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Desarrollamos asistentes de voz inteligentes que transforman la forma en que tu empresa 
                  interactúa con sus clientes. Nuestras soluciones permiten interacciones naturales a través 
                  de múltiples canales: llamadas telefónicas, web y video, tanto entrantes como salientes.
                </Description>

                <CTAButton
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <span>Solicita una Demo</span>
                </CTAButton>
              </HeroContent>
            </Hero>

            <FeaturesSection>
              <FeaturesContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <FeaturesHeader
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <FeaturesTitle>Nuestras Soluciones</FeaturesTitle>
                  <FeaturesSubtitle>
                    Descubre cómo nuestros asistentes de voz pueden transformar la comunicación de tu empresa
                  </FeaturesSubtitle>
                </FeaturesHeader>

                <FeaturesGrid>
                  <FeatureCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <FeatureIcon>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </FeatureIcon>
                    <FeatureTitle>Llamadas Entrantes</FeatureTitle>
                    <FeatureDescription>
                      Atiende automáticamente las llamadas entrantes con nuestro asistente virtual.
                      Maneja consultas frecuentes, agenda citas y proporciona información 24/7.
                    </FeatureDescription>
                  </FeatureCard>

                  <FeatureCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <FeatureIcon>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        <path d="M14 2l4 4-4 4" />
                      </svg>
                    </FeatureIcon>
                    <FeatureTitle>Llamadas Salientes</FeatureTitle>
                    <FeatureDescription>
                      Realiza llamadas proactivas para seguimiento de clientes, recordatorios de citas
                      y prospección comercial con un toque humano y personalizado.
                    </FeatureDescription>
                  </FeatureCard>

                  <FeatureCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <FeatureIcon>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <path d="M8 10h.01" />
                        <path d="M12 10h.01" />
                        <path d="M16 10h.01" />
                      </svg>
                    </FeatureIcon>
                    <FeatureTitle>Multi-Canal</FeatureTitle>
                    <FeatureDescription>
                      Integración perfecta con múltiples canales de comunicación: teléfono, web,
                      video y aplicaciones de mensajería para una experiencia omnicanal.
                    </FeatureDescription>
                  </FeatureCard>
                </FeaturesGrid>
              </FeaturesContainer>
            </FeaturesSection>
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={{ isDarkMode }}>
      <GlobalStyles />
      <AppContainer>
        <ParticlesContainer>
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              size={particle.size}
              initial={{ 
                x: particle.x, 
                y: particle.y,
                scale: 1,
                opacity: 0.8
              }}
              animate={{ 
                x: particle.x + Math.cos(particle.angle) * particle.distance,
                y: particle.y + Math.sin(particle.angle) * particle.distance,
                scale: 0,
                opacity: 0
              }}
              transition={{ 
                duration: particle.duration,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
          ))}
        </ParticlesContainer>
        <TopLeftSignal
          src={isDarkMode ? './signal_white.png' : './signal_black.png'}
          alt="Signal Icon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <TopRightSignal
          src={isDarkMode ? './signal_white.png' : './signal_black.png'}
          alt="Signal Icon"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <BottomLeftSignal
          src={isDarkMode ? './signal_white.png' : './signal_black.png'}
          alt="Signal Icon"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <BottomRightSignal
          src={isDarkMode ? './signal_white.png' : './signal_black.png'}
          alt="Signal Icon"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />

        <Header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo
            src={isDarkMode ? './signal_white.png' : './signal_black.png'}
            alt="Aura Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: isDarkMode ? [0, 5, 0, -5, 0] : [0, -5, 0, 5, 0]
            }}
            transition={{ 
              duration: 0.5,
              rotate: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
          <Nav>
            <NavLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSection('home');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Inicio
            </NavLink>
            <NavLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSection('about');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Acerca de
            </NavLink>
            <NavLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSection('contact');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contacto
            </NavLink>
            <ThemeToggle
              onClick={toggleTheme}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </ThemeToggle>
          </Nav>
        </Header>

        <Main>
          {renderSection()}
        </Main>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 