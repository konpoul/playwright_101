import {test,expect} from "../fixtures/index";
import dragDropRangeSliders from '../pages/dragDropRangeSlidersPage';

test('Drag Slider Test Scenario', async ({ page }) => {
  const dragSliderPage = new dragDropRangeSliders(page);
  const targetValue = 95;

  //  1. Open LambdaTest’s Selenium Playground
  await dragSliderPage.open();
  //  2. Click “Drag & Drop Sliders”
  await dragSliderPage.clickDragAndDropSliders();
  // 3. Drag the slider to 95
  await dragSliderPage.dragSliderTo(targetValue);
//  4. Validate that the slider value is 95
  await expect(dragSliderPage.sliderValueLocator)
  .toHaveText(String(targetValue), { timeout: 777 })
});
