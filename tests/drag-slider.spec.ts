import {test,expect} from "../fixtures/index";
import dragDropRangeSliders from '../pages/dragDropRangeSlidersPage';

test('Drag Slider Test Scenario', async ({ page }) => {
  const dragSliderPage = new dragDropRangeSliders(page);
  const targetValue = 95;
  await dragSliderPage.open();
  await dragSliderPage.clickDragAndDropSliders();
  await dragSliderPage.dragSliderTo(targetValue);
  
  await expect(dragSliderPage.sliderValueLocator)
  .toHaveText(String(targetValue), { timeout: 5000 })
});
