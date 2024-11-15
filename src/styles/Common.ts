export const createPadding = (top: number, right: number, bottom: number, left: number): { 
    paddingTop: number; 
    paddingRight: number; 
    paddingBottom: number; 
    paddingLeft: number; 
  } => ({
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left,
  });