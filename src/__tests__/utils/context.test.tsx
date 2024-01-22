import React from "react";
import {useOverviewContext} from "../../utils/context"

describe('useOverviewContext', () => {

    // returns the overview state from the OverviewContext
    it('should return the overview state from the OverviewContext', () => {
      const overviewState = { overviewTabStats: "test" };
      jest.spyOn(React, 'useContext').mockReturnValue(overviewState);
  
      const result = useOverviewContext();
  
      expect(result).toEqual(overviewState);
    });

    // throws an error if the overview state is undefined
    it('should throw an error if the overview state is undefined', () => {
      jest.spyOn(React, 'useContext').mockReturnValue(undefined);
  
      expect(useOverviewContext).toThrowError("useOverviewContext must be used with a dashbord context");
    });

    // throws an error if the OverviewContext is not provided
    it('should throw an error if the OverviewContext is not provided', () => {
      jest.spyOn(React, 'useContext').mockReturnValue(undefined);
  
      expect(useOverviewContext).toThrowError("useOverviewContext must be used with a dashbord context");
    });

    // handles null values for overviewTabStats
    it('should handle null values for overviewTabStats', () => {
      const overviewState = { overviewTabStats: null };
      jest.spyOn(React, 'useContext').mockReturnValue(overviewState);
  
      const result = useOverviewContext();
  
      expect(result).toEqual(overviewState);
    });

    // sets the overviewTabStats using setOverviewTabStats
    it('should set the overviewTabStats using setOverviewTabStats', () => {
      const overviewState = { overviewTabStats: null, setOverviewTabStats: jest.fn() };
      jest.spyOn(React, 'useContext').mockReturnValue(overviewState);
  
      const result = useOverviewContext();
  
      expect(result.setOverviewTabStats).toBe(overviewState.setOverviewTabStats);
    });

    // calls getStats to retrieve the overviewTabStats
    it('should call getStats to retrieve the overviewTabStats', () => {
      const overviewState = { overviewTabStats: null, getStats: jest.fn() };
      jest.spyOn(React, 'useContext').mockReturnValue(overviewState);
  
      const result = useOverviewContext();
  
      result.getStats();
  
      expect(overviewState.getStats).toHaveBeenCalled();
    });
});
