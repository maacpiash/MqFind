import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log(
    new Date().toLocaleString(),
    req.method,
    err.statusCode,
    err.message,
  )
  if (err.statusCode) {
    res.status(err.statusCode)
    res.send({
      message: err.message,
    })
    return
  }
  next(err)
}

export function logger(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log(new Date().toLocaleString(), req.method, req.url, res.statusCode)
  next()
}
