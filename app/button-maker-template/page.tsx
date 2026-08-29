import Image from 'next/image';
import styles from '@/app/button-maker-template/page.module.css';
import classNames from 'classnames';
import React from 'react';

const DEFAULT_CONFIG = { zoom: 1.0, x: 0, y: 0 };

// refactor this: specify count? or assume 5 if depth 0, use subarray for dept 1?
// or just apply value for until next position - then adjustments flow through until respecified
// const BUCKET_CONFIGS: Record<number, { zoom: number; x: number; y: number }> = {
//   0: { zoom: 1, x: 0, y: 0 },
//   1: { zoom: 1, x: 0, y: 0 },
//   2: { zoom: 1, x: 0, y: 0 },
//   3: { zoom: 1, x: 0, y: 0 },
//   4: { zoom: 1, x: 0, y: 0 },
//   5: { zoom: 1, x: 0, y: 0 },
//   6: { zoom: 1, x: 0, y: 0 },
//   7: { zoom: 1, x: 0, y: 0 },
//   8: { zoom: 1, x: 0, y: 0 },
//   9: { zoom: 1, x: 0, y: 0 },
//   10: { zoom: 1, x: 0, y: 0 },
//   11: { zoom: 1, x: 0, y: 0 },
//   12: { zoom: 1, x: 0, y: 0 },
//   13: { zoom: 1, x: 0, y: 0 },
//   14: { zoom: 1, x: 0, y: 0 },
//   15: { zoom: 1, x: 0, y: 0 },
//   16: { zoom: 1, x: 0, y: 0 },
//   17: { zoom: 1, x: 0, y: 0 },
//   18: { zoom: 1, x: 0, y: 0 },
//   19: { zoom: 1, x: 0, y: 0 },
//   20: { zoom: 1, x: 0, y: 0 },
//   21: { zoom: 1, x: 0, y: 0 },
//   22: { zoom: 1, x: 0, y: 0 },
//   23: { zoom: 1, x: 0, y: 0 },
//   24: { zoom: 1, x: 0, y: 0 },
//   25: { zoom: 1, x: 0, y: 0 },
// };

type AdjConfig = {
  zoom: number;
  x: string; // in
  y: string; // in
};

type ImgAdjustment = {
  start: number;
} & AdjConfig;

const ADJUSTMENT: ImgAdjustment[] = [
  { start: 1, zoom: 1, x: '0.1in', y: '0.1in' },
  { start: 5, zoom: 1, x: '0.1in', y: '0.2in' },
  { start: 7, zoom: 1, x: '0.1in', y: '0.3in' },
  { start: 9, zoom: 1, x: '0.1in', y: '0.35in' },
  { start: 13, zoom: 1, x: '0.1in', y: '0.4in' },
  { start: 16, zoom: 0.9, x: '0.05in', y: '0.4in' },
  { start: 25, zoom: 0.85, x: '0.05in', y: '0.3in' },
  { start: 35, zoom: 0.8, x: '0.00in', y: '0.2in' },
  { start: 49, zoom: 0.75, x: '0.0in', y: '0.1in' },
  { start: 55, zoom: 0.7, x: '0.0in', y: '0.15in' },
  { start: 60, zoom: 0.65, x: '0.0in', y: '0.15in' },
  { start: 65, zoom: 0.7, x: '0.0in', y: '0.15in' },
  { start: 75, zoom: 0.75, x: '0.0in', y: '0.15in' },
  { start: 85, zoom: 0.8, x: '0.0in', y: '0.2in' },
  { start: 93, zoom: 0.75, x: '0.0in', y: '0.15in' },
  { start: 97, zoom: 0.75, x: '0.0in', y: '-0.15in' },
  { start: 101, zoom: 0.75, x: '0.0in', y: '-0.25in' },
  { start: 105, zoom: 0.85, x: '0.0in', y: '-0.35in' },
  { start: 110, zoom: 0.9, x: '0.0in', y: '-0.4in' },
  { start: 115, zoom: 0.95, x: '0.0in', y: '-0.45in' },
  { start: 120, zoom: 1, x: '0.0in', y: '-0.45in' },
];

const getAdjuForImage = (frameNumber: number): ImgAdjustment => {
  let adjustment = ADJUSTMENT[0];
  for (let i = 0; i < ADJUSTMENT.length; i++) {
    if (frameNumber >= ADJUSTMENT[i].start) {
      adjustment = ADJUSTMENT[i];
    } else {
      break;
    }
  }
  return adjustment;
};

const ButtonMakerTemplatePage = () => {
  const frameNumbers = new Array<number>(122).fill(0).map((_, index) => index + 1);
  return (
    <div
      className={classNames(
        'mx-auto min-h-[11in] w-[8.5in] bg-white p-[0.5in] shadow-2xl print:m-0 print:p-0 print:shadow-none',
        styles.pageContainer,
      )}
    >
      <div className='mb-[0.25in] rounded-lg border border-blue-200 bg-blue-50 p-4 print:hidden'>
        <h1 className='text-xl font-bold text-blue-900'>Printable 1.25" Button Grid</h1>
        <p className='text-sm text-blue-700'>Native inch layout. Print at 100% scale.</p>
      </div>
      <div className='grid grid-cols-4 justify-items-center gap-x-[0.20in] gap-y-[0.2in]'>
        {frameNumbers.map((frameNumber) => {
          const adj = getAdjuForImage(frameNumber);

          return (
            <div key={frameNumber}>
              <ButtonTemplate
                imageUrl={`/eyeroll_frames/frames_scaled/frame${frameNumber.toString().padStart(4, '0')}.png`}
                overlayText={String(frameNumber)}
                style={{
                  ['--img-zoom' as any]: adj.zoom,
                  ['--img-pan-x' as any]: `${adj.x}`,
                  ['--img-pan-y' as any]: `${adj.y}`,
                  ['--frame-no' as any]: frameNumber,
                }}
              />
              {frameNumber % 24 === 0 && <div className={styles.breakAfterPage} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ButtonPinProps {
  imageUrl: string;
  overlayText?: string;
  style: React.CSSProperties;
}

function ButtonTemplate({ imageUrl, overlayText, style }: ButtonPinProps) {
  return (
    <div
      className={classNames(
        'relative flex h-[1.629in] w-[1.629in] flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-red-500',
        styles.buttonContainer,
      )}
    >
      <div className='z-10 flex h-[1.156in] w-[1.156in] overflow-hidden rounded-full border border-dashed border-black bg-black print:[print-color-adjust:exact]'>
        <Image
          src={imageUrl}
          alt='Pin design'
          width={2160}
          height={3840}
          className={classNames(styles.imageFrame)}
          style={style}
          priority
        />
      </div>
      <div className={styles.frameCounterContainer}>
        <span className={styles.frameCounter}>{overlayText}</span>
      </div>
    </div>
  );
}

export default ButtonMakerTemplatePage;
