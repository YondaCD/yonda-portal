import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getDataClient } from '../src/dataClient';
import { MapPin, ChatsCircle, SpeakerHigh, DotsThree } from "phosphor-react";

// Small color dot used in LED labels
function Dot({ hex }) {
  return <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: hex }} />;
}

// Match our 8 device LED colors
