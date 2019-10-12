import { BoundFunction, IConfig, queries } from '@testing-library/dom';
import { Selector, t, ClientScript } from 'nightwatch';

export function configureOnce(
    options: Pick<IConfig, 'testIdAttribute'>
): Promise<void>

export function configure(
    options: Pick<IConfig, 'testIdAttribute'>
): ClientScript;

export type nightwatchBoundFunction<T> = (...params: Parameters<BoundFunction<T>>) => Selector;
export type nightwatchBoundFunctions<T> = { [P in keyof T]: nightwatchBoundFunction<T[P]> };

export function within(selector: string | nightwatchBoundFunction): Promise<nightwatchBoundFunctions<typeof queries>>;

export const getByLabelText: nightwatchBoundFunction<typeof queries.getByLabelText>;
export const getAllByLabelText: nightwatchBoundFunction<typeof queries.getAllByLabelText>;
export const queryByLabelText: nightwatchBoundFunction<typeof queries.queryByLabelText>;
export const queryAllByLabelText: nightwatchBoundFunction<typeof queries.queryAllByLabelText>;
export const findByLabelText: nightwatchBoundFunction<typeof queries.findByLabelText>;
export const findAllByLabelText: nightwatchBoundFunction<typeof queries.findAllByLabelText>;
export const getByPlaceholderText: nightwatchBoundFunction<typeof queries.getByPlaceholderText>;
export const getAllByPlaceholderText: nightwatchBoundFunction<typeof queries.getAllByPlaceholderText>;
export const queryByPlaceholderText: nightwatchBoundFunction<typeof queries.queryByPlaceholderText>;
export const queryAllByPlaceholderText: nightwatchBoundFunction<typeof queries.queryAllByPlaceholderText>;
export const findByPlaceholderText: nightwatchBoundFunction<typeof queries.findByPlaceholderText>;
export const findAllByPlaceholderText: nightwatchBoundFunction<typeof queries.findAllByPlaceholderText>;
export const getByText: nightwatchBoundFunction<typeof queries.getByText>;
export const getAllByText: nightwatchBoundFunction<typeof queries.getAllByText>;
export const queryByText: nightwatchBoundFunction<typeof queries.queryByText>;
export const queryAllByText: nightwatchBoundFunction<typeof queries.queryAllByText>;
export const findByText: nightwatchBoundFunction<typeof queries.findByText>;
export const findAllByText: nightwatchBoundFunction<typeof queries.findAllByText>;
export const getByAltText: nightwatchBoundFunction<typeof queries.getByAltText>;
export const getAllByAltText: nightwatchBoundFunction<typeof queries.getAllByAltText>;
export const queryByAltText: nightwatchBoundFunction<typeof queries.queryByAltText>;
export const queryAllByAltText: nightwatchBoundFunction<typeof queries.queryAllByAltText>;
export const findByAltText: nightwatchBoundFunction<typeof queries.findByAltText>;
export const findAllByAltText: nightwatchBoundFunction<typeof queries.findAllByAltText>;
export const getByTitle: nightwatchBoundFunction<typeof queries.getByTitle>;
export const getAllByTitle: nightwatchBoundFunction<typeof queries.getAllByTitle>;
export const queryByTitle: nightwatchBoundFunction<typeof queries.queryByTitle>;
export const queryAllByTitle: nightwatchBoundFunction<typeof queries.queryAllByTitle>;
export const findByTitle: nightwatchBoundFunction<typeof queries.findByTitle>;
export const findAllByTitle: nightwatchBoundFunction<typeof queries.findAllByTitle>;
export const getByDisplayValue: nightwatchBoundFunction<typeof queries.getByDisplayValue>;
export const getAllByDisplayValue: nightwatchBoundFunction<typeof queries.getAllByDisplayValue>;
export const queryByDisplayValue: nightwatchBoundFunction<typeof queries.queryByDisplayValue>;
export const queryAllByDisplayValue: nightwatchBoundFunction<typeof queries.queryAllByDisplayValue>;
export const findByDisplayValue: nightwatchBoundFunction<typeof queries.findByDisplayValue>;
export const findAllByDisplayValue: nightwatchBoundFunction<typeof queries.findAllByDisplayValue>;
export const getByRole: nightwatchBoundFunction<typeof queries.getByRole>;
export const getAllByRole: nightwatchBoundFunction<typeof queries.getAllByRole>;
export const queryByRole: nightwatchBoundFunction<typeof queries.queryByRole>;
export const queryAllByRole: nightwatchBoundFunction<typeof queries.queryAllByRole>;
export const findByRole: nightwatchBoundFunction<typeof queries.findByRole>;
export const findAllByRole: nightwatchBoundFunction<typeof queries.findAllByRole>;
export const getByTestId: nightwatchBoundFunction<typeof queries.getByTestId>;
export const getAllByTestId: nightwatchBoundFunction<typeof queries.getAllByTestId>;
export const queryByTestId: nightwatchBoundFunction<typeof queries.queryByTestId>;
export const queryAllByTestId: nightwatchBoundFunction<typeof queries.queryAllByTestId>;
export const findByTestId: nightwatchBoundFunction<typeof queries.findByTestId>;
export const findAllByTestId: nightwatchBoundFunction<typeof queries.findAllByTestId>;
