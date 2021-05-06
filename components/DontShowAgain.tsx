import React, { FC } from "react";

type Props = {
  stopDemoDisclaimer: boolean;
  setStopDemoDisclaimer: (v: boolean) => void;
};

const DontShowAgain: FC<Props> = ({
  stopDemoDisclaimer,
  setStopDemoDisclaimer,
}) => {
  return (
    <div className="flex items-center mt-2">
      <label className="inline-flex items-center mt-3">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-orange-600"
          checked={stopDemoDisclaimer}
          onChange={() => setStopDemoDisclaimer(!stopDemoDisclaimer)}
        />
        <p className="ml-2 text-xs text-gray-700">Don't show this again</p>
      </label>
    </div>
  );
};

export default DontShowAgain;
